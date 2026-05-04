import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import DesignRuntimeLogSink from "./designRuntimeLogSink.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = createInterface({
    input: stdin,
    output: stdout,
});

class Runtime {
    constructor(design) {
        this.design = design;
        this.worldState = null;
        this.currentNode = null;
        const filePath = path.join(__dirname, "pythonLogSink.py");
        this.sink = new DesignRuntimeLogSink(filePath);
        this.showInConsole = true;
    }

    log (event) {
        this.sink.write(event);
    }

    /**
     * Initialize the world and visit atomic node.
     */
    async run() {
        this.initialize();
        await this.visitCurrentNode();
        console.log("Execution complete. Terminating program.");
        await this.sink.close();
        rl.close();
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

    displayInConsole(behavior) {
        if (!this.showInConsole) return;
        console.log("");
        console.log("Behavior:", behavior.getName());
        console.log("World State:", this.worldState);
        console.log("");
    }

    async visitCurrentNode() {
        const behaviorArgs = {};
        const behavior = this.currentNode.getBehavior();

        // Log the behavior being executed
        this.sink.logBehavior(behavior.getName());

        // Get pre-execution metadata for the behavior and set the pre-world state for the behavior.
        const preMeta = behavior.getPreExecutionMeta();
        behavior.setPreWorldState(this.worldState);

        // Gather required inputs from the user based on pre-execution metadata
        if (preMeta.requiredInputs && preMeta.requiredInputs.length > 0) {
            for (const input of preMeta.requiredInputs) {
                const value = await this.getInput(`Please provide a value for ${input}: `);
                behaviorArgs[input] = value;
            }
        }

        // Log the behavior arguments for the current behavior
        for (const argName in behaviorArgs) {
            this.sink.logArgument(argName, behaviorArgs[argName], behavior.getName());
        }

        // Log the pre-world state for each participant before executing the behavior
        for (const participant in this.worldState) {
            this.sink.logParticipant(behavior.getName(), participant, "pre", this.worldState[participant]);
        }

        // Set up behavior and compute transformations.
        behavior.setPrimitiveArgs(behaviorArgs);
        behavior.setPreWorldState(this.worldState);
        behavior.setPostWorldState({});
        const results = behavior.computeTransformations();

        // Load the new world state
        if ("transform" in results.output) {
            
            // Check if computation failed and log failure if it did.
            const failedTransform = results.output.transform.find((t) => t.type === "error");
            if (failedTransform) {
                this.sink.logFailure(behavior.getName());
                console.error(`Error executing behavior ${behavior.getName()}:`);
                return;
            }

            // Find the validate transform output to update the world state.
            const transformResult = results.output.transform.find((t) => {
                return t.type === "validate";
            });
            if (!transformResult) {
                console.log(results);
                throw new Error("No validate transform output found in behavior results.");   
            }
            this.worldState = transformResult.transformationOutput;
        } else {
            throw new Error("No transform output found in behavior results.");
        }


        this.displayInConsole(behavior);

        // Log the post-world state for each participant after executing the behavior
        for (const participant in this.worldState) {
            this.sink.logParticipant(behavior.getName(), participant, "post", this.worldState[participant]);
        }

        // Get the possible next behaviors for current node
        const nextBehaviors = this.currentNode._goToBehaviorIds;

        // If there are no next behaviors, end execution.
        if (nextBehaviors.length === 0) {
            console.log("No next behaviors found. Ending execution.");
            return;
        }

        // Go through each behavior to find the next valid one
        for (const nextBehaviorName of nextBehaviors) {
            const nextNode = this.design.graph.findNode(nextBehaviorName);
            const nextBehavior = nextNode.getBehavior();
            nextBehavior.setPreWorldState(this.worldState);
            const nextPreMeta = nextBehavior.getPreExecutionMeta();

            const isValidBehavior = nextPreMeta.isWorldStateValidForBehavior;
            if (isValidBehavior || isValidBehavior === null) {
                this.currentNode = nextNode;
                await this.visitCurrentNode();
                // Assuming only one valid next behavior should be possible.
                break; 
            }
        }
    }
}

export const run = async (design) => {
    await new Runtime(design).run();
};
