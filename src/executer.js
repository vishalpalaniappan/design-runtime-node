import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  output: stdout
});

export const run = async (design) => {
    const graph = design.graphs.getActiveGraph();
    const atomic = graph.nodes.find((node) =>node.isAtomic());

    if (atomic) {
      // Start at atomic node and then walk the behavioral control graph.
      console.log("Found atomic node: ", atomic.getBehavior().getName()); 
    }
    
    const name = await rl.question('Enter name: ');
    console.log(`You entered: ${name}`);
    rl.close();

    /**
     * TODO: So ultimately, this is essentially going to be
     * an execution of the script. So when the script requires
     * a participant as an input, then I need to request that
     * and load it into the args. If an required input has a
     * value, then I need to check if that world state is
     * satisfied. So I will add a method to the behavior to parse
     * the input requirements and then use that to execute logic
     * before executing the script (if the behavior is valid).
     */

}