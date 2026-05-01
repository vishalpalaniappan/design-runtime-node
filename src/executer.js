import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({
    input: stdin,
    output: stdout,
});

class Runtime {
    constructor(design) {
        this.design = design;
        this.worldState = null;
        this.currentNode = null;
        this.initialize();
        this.visitCurrentNode();
    }

    getInput (prompt) {
        return rl.question(prompt);
    }

    initialize() {
        this.worldState = {};
        const graph = this.design.graphs.getActiveGraph();
        const atomic = graph.nodes.find((node) => node.isAtomic());
        if (!atomic) {
            throw new Error("No atomic node found in the graph.");
        }
        const behavior = atomic.getBehavior();
        this.currentNode = atomic;
    }

    visitCurrentNode() {

    }
}

export const run = async (design) => {
    const runtime = new Runtime(design);
    /**
     * TODO: So ultimately, this is essentially going to be
     * an execution of the script. So when the script requires
     * a participant as an input, then I need to request that
     * and load it into the args. If a required input has a
     * value, then I need to check if that world state is
     * satisfied. So I will add a method to the behavior to parse
     * the input requirements and then use that to execute logic
     * before executing the script (if the behavior is valid).
     */
};
