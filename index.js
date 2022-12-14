const fs = require("node:fs")
const readline = require("node:readline")

let solvers = require("./solvers")

const sorter = (a, b) => 0.5 - Math.random()

const getWords = async () => {
    const fileStream = fs.createReadStream("./words.txt")

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const words = []
    for await (const word of rl) {
        words.push(word)
    }
    return words
}

const runSolver = async (target, solver, words) => {
    let i = 6
    const used = {}
    while (true) {
        if (i < -200) {
            return i
        }
        const guess = await solver(used, words)
        if (guess === undefined || Object.keys(used).includes(guess)) {
            return -200
        }
        if (guess === target) {
            return i
        }
        used[guess] = [...guess].map((l, ii) => {
            if (target[ii] === l) {
                return "!"
            }
            if (target.includes(l)) {
                return "*"
            }
            return "."
        })
        i--
    }
}

const test = async () => {
    const words = await getWords()

    const randomWords = words
        .sort(sorter)
        .sort(sorter)
        .sort(sorter)
        .slice(0, 100)

    const scores = {}
    for (const word of randomWords) {
        console.log(word)
        for (const solver in solvers) {
            if (scores[solver] === undefined) {
                scores[solver] = 0
            }
            const score = await runSolver(word, solvers[solver], words)
            scores[solver] += score
        }
    }

    const readme = fs.readFileSync(`./README.md.tmp`)
    fs.writeFileSync(`./README.md`, readme)
    fs.appendFileSync(`./README.md`, `| Solver | Score | Avg Guesses |\n`)
    fs.appendFileSync(`./README.md`, `| --- | --- | --- |\n`)
    for (const solver of Object.keys(scores).sort(
        (a, b) => scores[b] - scores[a]
    )) {
        fs.appendFileSync(
            `./README.md`,
            `| ${solver} | ${scores[solver]} | ${(
                6 -
                scores[solver] / randomWords.length
            ).toFixed(1)} |\n`
        )
    }
}

test()
