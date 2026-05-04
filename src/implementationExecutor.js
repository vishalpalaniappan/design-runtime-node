import { spawn } from "node:child_process";
import CollectInputs from "./collectInputs.js";

const args = process.argv;
if (args.length < 3) {
	console.error("Please provide the path to the design file as an argument.");
	process.exit(1);
}

const path = args[2];
const trace = args[3];
let inputs;
if (trace) {
	try {
		inputs = await CollectInputs(trace);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
}

if (inputs && inputs.length > 0) {
	// Interactive mode
	const child = spawn("python3", [path], {
		stdio: ["pipe", "pipe", "inherit"],
	});

	let i = 0;

	child.stdout.on("data", (data) => {
		process.stdout.write(data);

		if (inputs && i < inputs.length) {
			console.log("");
			console.log("Sending input:", inputs[i].argumentValue);
			console.log("");
			child.stdin.write(inputs[i].argumentValue + "\n");
			i = i + 1;
		}
	});

	child.on("close", (code) => {
		console.log(`Exited with code ${code}`);
	});
} else {
	// Non-interactive mode
	const child = spawn("python3", [path], {
		stdio: "inherit",
	});

	child.on("close", (code) => {
		console.log(`Exited with code ${code}`);
	});
}
