# Wordle Solvers

## What's the best way of solving wordle?

Let's find out.

This repo is to test different algorithms against each other.

### Adding your algorithm

1. Create an issue with your github username and pithy description of your algorithm as the title
2. Create a branch from your issue, the branch name should be {issue-number}-{issue-title} i.e. 1-warrickhill-random-word
3. Create a dir in the solvers directory that matches the branch name
4. Copy template.js to {your-dir}/index.js
5. Write your solver in the exported function, commit and open a PR
6. The first param is and obj where the keys are words than have been used and the value is the score for that word as a string. `.` not in the word, `*` in the word, but not in this spot, `!` in the correct location. `{tests: ".!*.."}`

### Rules for your solver

-   Vanilla JS only
-   Must not use external packages
-   No calls to external apis
-   Code must only be committed inside your dir

### Running the solvers

```
yarn go
```

| Solver                     | Score | Avg Guesses |
| -------------------------- | ----- | ----------- |
| 3-warrickhill-ranked-words | 201   | 4.0         |
| 1-warrickhill-random-word  | 184   | 4.2         |
