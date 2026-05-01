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
      // Start at atomic node and then walk
      // the behavioral control graph.
      console.log("Found atomic node: ", atomic.getBehavior().getName()); 
    }
    
    const name = await rl.question('Enter name: ');
    console.log(`You entered: ${name}`);
    rl.close();

}