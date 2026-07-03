import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import DesignRuntimeLogSink from "./designRuntimeLogSink.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Runtime {
    constructor(design, inputs) {
        // Core runtime state
        this.design = design;
        this.worldState = null;
        this.currentNode = null;
        this.inputs = inputs;
        
        // Debug flags
        this.showInConsole = true;

        // Python log sink setup
        const filePath = path.join(__dirname, "pythonLogSink.py");
        this.sink = new DesignRuntimeLogSink(filePath);

        // CLI setup needed for getting user input for behavior arguments and other prompts.
        this.rl = createInterface({
            input: stdin,
            output: stdout,
        });
    }

    log (event) {
        this.sink.write(event);
    }

    /**
     * Initialize the world and visit atomic node.
     */
    async run() {
        try {
            this.initialize();
            while (this.currentNode) {
                const nextNode = await this.visitCurrentNode();
                if (!nextNode) {
                    this.currentNode = null;
                    break;
                } else {
                    this.currentNode = nextNode;
                }
            }
            console.log("Execution complete. Terminating program.");
        } finally {
            await this.sink.close();
            this.rl.close();
        }
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
        if (this.inputs) {
            if (value === null) {
                console.log("No inputs left in replay. Ending execution.");
            }
            const input = this.inputs.shift();
            return input.argumentValue;
        } else {
            return this.rl.question(prompt);
        }
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
                if (value === null) {
                    console.log("No inputs left in replay. Ending execution.");
                    return;
                }
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
                console.error("Transform results:", results);
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

        // Check if there is a next output in the behavior results
        if (!("next" in results.output)) {
            console.error("No next output found in behavior results.");
            return;
        }
        if (results.output.next.length === 0) {
            console.log("No next behaviors found. Ending execution.");
            return;
        }

        // Valid next behaviors will have an entry with output with type select.
        const nextBehaviors = results.output.next.filter((entry) => 
            (entry.output && entry.output.type === "select")
        );
        
        // No valid behaviors found
        if (nextBehaviors.length === 0) {
            console.log("No valid next behaviors found. Ending execution.");
            return;
        }
        // Multiple valid next behaviors are not supported.
        if (nextBehaviors.length > 1) {
            console.warn("Multiple valid next behaviors found. This is not currently supported");
            return;
        }

        // Get the next behavior entry and validate it has the necessary nextBehavior field in its output.
        const nextBehaviorEntry = nextBehaviors[0];
        if (!nextBehaviorEntry) {
            console.error("No valid next behavior entry found in behavior results.");
            return;
        }
        if (!("nextBehavior" in nextBehaviorEntry.output)) {
            console.error("No nextBehavior found in next output.");
            return;
        }

        // Get the next node
        const nextBehaviorName = nextBehaviorEntry.output.nextBehavior;
        const nextNode = this.design.graph.findNode(nextBehaviorName);
        if (!nextNode) {
            console.error(`Next node ${nextBehaviorName} not found in the graph.`);
            return;
        }
        return nextNode;
    }
}

export const run = async (design, inputs) => {
    await new Runtime(design, inputs).run();
};
