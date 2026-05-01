# design-runtime-node
A tool that executes designs and produces semantic traces for analysis and debugging.

## Background

This tool executes design files and produces semantic execution traces that can be ingested by the DAL engine. Given a design file, it provides a command-line interface to execute the design and generate traces containing the relevant semantic information. These traces are then consumed by the DAL engine in the workbench, where they are used to perform automated debugging and analysis.

The tool is intended to run on the workbenches server, allowing users to execute designs from the terminal and load the resulting traces into the workbench for inspection. Support for live debugging will extend this workflow into an interactive experience, where execution results are streamed to the workbench in real time.

When a design leverages concurrency, this tool can spawn workers to execute behaviors in parallel. These workers may run locally or be delegated to remote clusters, enabling execution across truly distributed substrates. This allows concurrent paths in the design to be realized as distributed execution, while still producing a semantic execution traces that can be ingested by the DAL engine and understood as the behavior of a single design.

I will share more about this as I continue but I think before I move forward with the automated debugging of execution traces in more detail, I should implement this so that I can complete that process and put it all together. In my first iteration, I intend to provide an interface in the workbench to execute the design with this tool and to bring in the resulting semantic traces to the workbench.

## Workflow

In the design-driven software development workflow, the user will first specify a design and use this tool to execute the design and establish its correctness. In this process, they will identify all the invariants intrinsict to the design. Only then will they move forward with the implementation of the design in a programming language. The design is then able to automatically debug the execution because it is the authoritative semantic model. Using the automatic debugging of the execution traces, the design will learn semantics that it must respect to realize its intentions on the substrate. 

Every step of the process is explicit and done with clarity. The entire software development lifecycle is contained within this framework, producing a repository that is a complete and unambiguous record of the evolution of the design, its implementation, and its executions.

When applied to distributed systems, this entire process collapses the incidental complexity of distributed logic. Not only does it create a layer which allows the creation, testing and verification of the design of the distributed system before implementing, it then automatically understands the distributed execution of the implementation as the behavior of a single unabigious design.