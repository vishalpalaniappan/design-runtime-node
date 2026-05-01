import { spawn } from "node:child_process";

export default class PythonLogSink {
  constructor(scriptPath) {
    this.proc = spawn("python3", [scriptPath], {
      stdio: ["pipe", "inherit", "inherit"],
    });

    this.proc.on("exit", (code) => {
      console.error(`Python log sink exited with code ${code}`);
    });
  }

  write(event) {
    const line = JSON.stringify(event) + "\n";
    this.proc.stdin.write(line);
  }

  close() {
    this.proc.stdin.end();
  }
}