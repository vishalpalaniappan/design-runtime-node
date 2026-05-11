import {run} from './designExecutor/designExecutor.js';
import {DALEngine} from "dal-engine-core-js-lib-dev";
import {readFile} from "fs/promises";
import CollectInputs from "./collectInputs.js";
import {runImplementation} from "./implementationExecutor/implementationExecutor.js";

const loadDesign = async (path) => {
    const data = await readFile(path);
    const engine = new DALEngine({name: "Library Manager", description: ""});
    engine.deserialize(data);
    return engine;
}

/**
 * Run design with following modes:
 * 1. Design with inputs from user
 * 2. Design with inputs from trace file (for replaying traces)
 * 3. Implementation with inputs from trace file (for replaying traces)
 * 
 * node index.js design [path to design file] [optional: path to trace file for design execution]
 * node index.js implementation [path to implementation file] [optional: path to trace file for implementation execution]
 * 
 * Tested:
 * node src/index.js implementation designs/lib_man_no_invariant.dal
 * node src/index.js design designs/lib_man_no_invariant.dal traces/invalid_name_failure.clp.zst
 * node src/index.js implementation designs/library_manager.py
 * 
 * When the design is executed it will produce a trace file in the folder where the script is called from (the working directory).
 * When replaying execution with trace file, I am relying on the workbench to instrument the program before
 * calling this method. So the natural next move is to move the instrumenter here and and first instrument it before executing it.
 * 
 * TODO: Move instrumenter into this tool and instrument before executing implementaiton (with and without trace file).
 * 
 * TODO: In the long run, it makes sense to write the engine in C++ and then create FFI libraries using it.
 * 
 * TODO: 
 * I think that the next step in this process is that the semantic model is what actually realizes the transformations and the
 * implementation is just substrate level mechanisms that are necessary for practically realizing the design. It would turn programming
 * into semantic modelling where meaning is what is being implemented, it would truly be a semantic world engine. The implementation is
 * just the connectors that allow the semantic model to interact with the world and realize its meaning in the world. 
 * 
 * I can call it a semantic design language and the substrate level connectors are what connect it to the outside world. 
 * For example, in a distributed system, the network would connect the semantic engine running on different machines, its 
 * literally the same design running. This does feel like the natural next step because why am I implementing the same 
 * transformations as the engine? It is already computing the transformations, I just need to enable it to interact with reality.
 */
const main = async () => {
    const args = process.argv;

    const type = (args.length < 3) ? null : args[2];
    if (type !== "design" && type !== "implementation") {
        console.error("Invalid type argument. Please use 'design' or 'implementation'.");
        process.exit(1);
    } else {
        console.log(`Running ${type}...`);
    }

    const path = (args.length < 4) ? null : args[3];
    if (!path) {
        console.error("Please provide the path to the design or implementation file as an argument.");
        process.exit(1);
    } else {
        console.log(`Using file: ${path}`);
    }

    const trace = (args.length < 5) ? null : args[4];
    if (trace) {
        console.log(`Using trace file: ${trace}`);
    } else {
        console.log("No trace file provided. Running without trace.");
    }

    try {
        let inputs;
        if (trace) {
            inputs = await CollectInputs(trace);
        }
        if (type === "implementation") {
            await runImplementation(path, inputs);
        } else if (type === "design") {
            const designEngine = await loadDesign(path);
            await run(designEngine, inputs);
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

try {
    await main();
} catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    process.exit(1);
}