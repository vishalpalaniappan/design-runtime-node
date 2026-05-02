import { spawn } from "node:child_process";

export default class DesignRuntimeLogSink {

    /**
     * A log sink that sends design runtime events to a python
     * process to log in compressed form using CLP logging library.
     * 
     * Note: In the write method, its possible for the write to fail
     * if there is backpressure etc (according to what I've read), if I
     * see that happen, I will probably throttle the logging by buffering
     * the events. This is a temporary solution anyway, so as long as it
     * works, I am not going to worry about that for now.
     * 
     * @param {String} scriptPath 
     */
    constructor(scriptPath) {
        this.proc = spawn("python3", [scriptPath], {
            stdio: ["pipe", "inherit", "inherit"],
        });

        this.proc.on("exit", (code) => {
            console.error(`Python log sink exited with code ${code}`);
        });
    }

    logParticipant(behaviorName, participantName, participantType, participantValue) {
        this.write({
            "behaviorName": behaviorName,
            "participantName": participantName,
            "participantType": participantType,
            "participantValue": participantValue,
            "type": "participant"
        })
    }

    logArgument(argumentName, argumentValue, behaviorName) {
        this.write({
            "argumentName": argumentName,
            "argumentValue": argumentValue,
            "behaviorName": behaviorName,
            "type": "argument"
        });
    }

    logBehavior(behaviorName) {
        this.write({
            "behaviorName": behaviorName,
            "type": "behavior",
        })
    }

    logFailure(behaviorName) {
        this.write({
            "behaviorName": behaviorName,
            "type": "failure",
        })
    }

    write(event) {
        const line = JSON.stringify(event) + "\n";
        this.proc.stdin.write(line);
    }

    close() {
        this.proc.stdin.end();
    }
}