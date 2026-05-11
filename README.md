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

# Background

Before talking about the tool modes, I want to mention that all this functionality should be in the engine. It should be able to execute the design and
implementation with and without the traces. Once I move the instrumentation to javascript, I will begin to make that move. I will provide node and browser
builds so that the engine can determine if it can leverage the node features for running the implementation on the server. Ofcourse, the design itself can
be executed anywhere because the engine does all the computation, even in the browser, I can provide a prompt for the user.

I will outline this in more detail when I make the move but for now, all of this functionality will be contained in this tool. With that said, here are some
more details on the supported modes.

# Executing Semantic Model

The design itself consists of a collection of behaviors, where each one is specified in the behavioral scripting language. The full life cycle of each behavior is defined, meaning that the model can compute the behavior directly (starting at the atomic behavior) and move onto the next behavior given the resulting world state. The actual realization of the scripting languge happens in the engine, so this tool just implements the scaffolding to make that possible.

# Using Trace Inputs on Design and Implementation


# Providing feedback

You can use GitHub issues to [report a bug][bug-report] or [request a feature][feature-req].

[bug-report]: https://github.com/vishalpalaniappan/design-runtime-node/issues
[feature-req]: https://github.com/vishalpalaniappan/design-runtime-node/issues