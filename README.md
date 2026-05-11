# design-runtime-node

This tool is a design runtime that can use inputs from trace files to run computable semantic models or implementations of semantic models while producing a compressed log file which represents the behavior of the design.

This tool, written in nodejs, serves as the design runtime and its responsibilities are listed below:
- Given a design file, it computes the design as one computable semantic module.
- Given a trace file, it computes the design using the inputs from the trace file.
- Given a trace file, it executes an implementation of the design written in python using inputs from the trace file.

From the three use cases listed above, it can be argued that I could have split this tool in two, where one tool computes the design and the other uses the trace file to run the design or the implementation. However, the two features are so closely linked that it made sense to me to build them together. Perhaps in the future, one of the features will grow large and it will have to be split into multiple tools.

# Usage


# Background


# Providing feedback

You can use GitHub issues to [report a bug][bug-report] or [request a feature][feature-req].

[bug-report]: https://github.com/vishalpalaniappan/design-runtime-node/issues
[feature-req]: https://github.com/vishalpalaniappan/design-runtime-node/issues