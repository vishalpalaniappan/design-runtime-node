import { spawn } from "node:child_process";

export const runImplementation = async (path, inputs) => {
	if (inputs) {
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
}