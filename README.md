# design-runtime-node

This tool is a design runtime that can use inputs from trace files to run computable semantic models or implementations of semantic models while producing a compressed log file which represents the behavior of the design.

This tool, written in nodejs, serves as the design runtime and its responsibilities are listed below:
- Given a design file, it computes the design as one computable semantic module.
- Given a trace file, it computes the design using the inputs from the trace file.
- Given a trace file, it executes an implementation of the design written in python using inputs from the trace file.

From the three use cases listed above, it can be argued that I could have split this tool in two, where one tool computes the design and the other uses the trace file to run the design or the implementation. However, the two features are so closely linked that it made sense to me to build them together. Perhaps in the future, one of the features will grow large and it will have to be split into multiple tools.

This tool is used by the Workbench to run designs and instrumented implementations. The resulting trace files are then fed into the engine as part of the design feedback loop. From these traces, the engine can either identify the root cause of a failure or help the design learn new semantics revealed by inputs.
This also demonstrates one of the framework’s most powerful features, the traces become authoritative environments for validating the behavior and invariants of the design.

# Usage


# Executing Semantic Model

The design itself consists of a collection of behaviors, where each one is specified in the behavioral scripting language. The full life cycle of each behavior is defined, meaning that the model can compute the behavior directly (starting at the atomic behavior) and move onto the next behavior given the resulting world state. The actual realization of the scripting languge happens in the engine, so this tool just implements the scaffolding to make that possible.

It can be argued that this tools functionality can be contained inside the engine and ultimately I think that it is correct. I primarly wrote it as a separate tool because I wanted to setup the functionality to get the input from the user in nodejs so the server can use it. However, the actual logic can be moved to the engine, and it simply provides a prompt to the consuming application to request a value. I can also produce node and browser builds of the engine so that I can even move the input functionality into the engine.

For now, I will keep it as a separate tool.

# Using Trace Inputs



# Providing feedback

You can use GitHub issues to [report a bug][bug-report] or [request a feature][feature-req].

[bug-report]: https://github.com/vishalpalaniappan/design-runtime-node/issues
[feature-req]: https://github.com/vishalpalaniappan/design-runtime-node/issues