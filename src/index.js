import {run} from './executor.js';
import {DALEngine} from "dal-engine-core-js-lib-dev";
import {readFile} from "fs/promises";
import CollectInputs from "./collectInputs.js";

const loadDesign = async (path) => {
    const data = await readFile(path);
    const engine = new DALEngine({name: "Library Manager", description: ""});
    engine.deserialize(data);
    return engine;
}
const args = process.argv;
if (args.length < 3) {
    console.error("Please provide the path to the design file as an argument.");
    process.exit(1);
}

const path = args[2];
const trace = args[3];
try {
    let inputs;
    if (trace) {
        inputs = await CollectInputs(trace);
    }
    const designEngine = await loadDesign(path);
    await run(designEngine, inputs);
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
}