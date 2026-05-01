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
    }

    /**
     * Initialize the world and visit atomic node.
     */
    async run() {
        this.initialize();
        await this.visitCurrentNode();
    }

    /**
     * Initializes the runtime:
     * - Sets up the initial world state.
     * - Finds the first atomic node in the active graph and sets it as the current node.
     * - Throws an error if no atomic node is found, as the runtime cannot proceed without a starting point.
     */
    initialize() {
        this.worldState = {};
        const graph = this.design.graphs.getActiveGraph();
        const atomic = graph.nodes.find((node) => node.isAtomic());
        if (!atomic) throw new Error("No atomic node found in the graph.");
        this.currentNode = atomic;
    }

    /**
     * Gets an input from the user via the command line interface.
     * @param {String} prompt 
     * @returns {Promise<String>}
     */
    async getInput (prompt) {
        return rl.question(prompt);
    }

    async visitCurrentNode() {
        const behaviorArgs = {};
        const behavior = this.currentNode.getBehavior();
        behavior.setPreWorldState(this.worldState);
        const preMeta = behavior.getPreExecutionMeta();

        // Gather required inputs from the user based on pre-execution metadata
        if (preMeta.requiredInputs && preMeta.requiredInputs.length > 0) {
            for (const input of preMeta.requiredInputs) {
                const value = await this.getInput(`Please provide a value for ${input}: `);
                behaviorArgs[input] = value;
            }
        }

        console.log("Behavior Arguments:", behaviorArgs);
        console.log("Pre behavior Worldstate:", this.worldState);

        // Set up behavior and compute transformations.
        behavior.setPrimitiveArgs(behaviorArgs);
        behavior.setPreWorldState(this.worldState);
        behavior.setPostWorldState({});
        const results = behavior.computeTransformations();

        // Load the new world state
        if ("transform" in results.output) {
            const transformResult = results.output.transform.find((t) => {
                return t.type === "validate";
            });
            this.worldState = transformResult.transformationOutput;
        } else {
            throw new Error("No transform output found in behavior results.");
        }

        console.log("Post Behavior Worldstate:", this.worldState);

        // Log design semantics

        // Go to next valid node based on design semantics and execution result
    }
}

export const run = async (design) => {
    new Runtime(design).run();
};
