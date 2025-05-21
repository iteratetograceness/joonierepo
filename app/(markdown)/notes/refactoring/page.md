# Refactoring

Software that works is rarely software that lasts. Software also *decays*, largely due to changes shipped in service of short-terms goals, without a full understanding of the architecture. [Tech ~~debt~~ inflation](https://github.com/Scottbruceheart/primer/blob/main/articles/technical_inflation.md) is incurred in service of shipping faster. Code initially shipped is rarely pre-optimized or abstracted to make future changes; as the codebase grows, it becomes harder to add new things or diagnose bugs. Owners of a particular part of the codebase leave.

Below are principles and engineering habits pulled from Martin Fowler’s book, *Refactoring*, to combat the pitfalls of the above:

- When adding a new feature, if it isn’t convenient to add, refactor the code to make it easy to do so.
- A true test of good code is how easy it is to change.
- Test-driven refactoring; if test(s) are missing, they should be added.
- Refactoring should be done in small steps, which may first look like rearranging/moving of code; at each step, tests should be passing.
- Refactoring code includes making the code clearer and easier to understand (e.g. variable renaming) and reducing “cognitive overhead” (source: *Max Leiter*) for myself and others.
- Choosing when it’s worth and how much to refactor is based on whether I’m directly working in that part of the codebase and how long it’ll take. Usually it’s always worthwhile to make even the slightest improvement (”leave the campsite cleaner than when you found it”).
- Even excellent code needs refactoring.
- Sometimes, it’s easier to rewrite than to refactor; there is no black and white heuristic for determining this, and the decision requires good judgement and experience.
- It’s often better to write great code that solves the current needs and rely on refactoring to adapt to new demands, as opposed to pre-optimizing architecture with speculative flexibility.
- The effectiveness of refactoring is contingent upon the software practices used by a team (e.g. continuous integration, testing suites).
- Most of us rarely write clean code the first time around.

Especially in this new era of vibe-coding and code co-written by LLMs, exercising a healthy habit of refactoring becomes more critical.

Related quotes and sentiments not from the book:

- “Put **hard API boundaries** around boxes of slop, replace the boxes of slop as needed”
- “**RPC semantics** are my most reliable way of keeping boundaries. Procedures that have fully visible input and output state. Use abstractions, then do not let you or anyone violate that constraint”

Last updated: 2025-05-20