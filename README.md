# design-runtime-node
A tool that executes designs and produces semantic traces for analysis and debugging.

## Background

This tool executes design files and produces semantic execution traces that can be ingested by the DAL engine. Given a design file, it provides a command-line interface to execute the design and generate traces containing the relevant semantic information. These traces are then consumed by the DAL engine in the workbench, where they are used to perform automated debugging and analysis.

The tool is intended to run on the workbenches server, allowing users to execute designs from the terminal and load the resulting traces into the workbench for inspection. Support for live debugging will extend this workflow into an interactive experience, where execution results are streamed to the workbench in real time.

When a design leverages concurrency, this tool can spawn workers to execute behaviors in parallel. These workers may run locally or be delegated to remote clusters, enabling execution across truly distributed substrates. This allows concurrent paths in the design to be realized as distributed execution, while still producing a unified semantic execution trace that can be ingested by the DAL engine.

I will share more about this as I continue but I think before I move forward with the automated debugging of execution traces in more detail, I should implement this so that I can complete that process and put it all together. In my first iteration, I intend to provide an interface in the workbench to execute the design with this tool and to bring in the resulting semantic traces to the workbench.
