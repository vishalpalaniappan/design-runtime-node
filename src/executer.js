import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  output: stdout
});


export const run = async (design) => {
    const name = await rl.question('Enter name: ');
    console.log(`You entered: ${name}`);
    rl.close();
}