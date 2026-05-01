import {run} from './src/executor.js';
import {DALEngine} from "dal-engine-core-js-lib-dev";
import {readFile} from "fs/promises";

const loadDesign = async (path) => {
    const data = await readFile(path);
    const engine = new DALEngine({name: "Library Manager", description: ""});
    engine.deserialize(data);
    return engine;
}

const designEngine = await loadDesign('./designs/demo2.dal');
run(designEngine);