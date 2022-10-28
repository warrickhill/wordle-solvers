const filer = (used) => (word) => {
    let ignore = []
    const posIgnore = { 0: [], 1: [], 2: [], 3: [], 4: [] }
    const posMust = {}
    const wordMust = []
    for (const tried in used) {
        const pos = used[tried]
        for (let i = 0; i < 5; i++) {
            if (pos[i] === ".") {
                ignore.push(tried[i])
            }
            if (pos[i] === "*") {
                posIgnore[i].push(tried[i])
                wordMust.push(tried[i])
            }
            if (pos[i] === "!") {
                posMust[i] = tried[i]
            }
        }
    }

    ignore = ignore.filter(
        (l) => ![...Object.values(posMust), ...wordMust].includes(l)
    )

    if (Object.keys(used).includes(word)) {
        return false
    }

    if ([...word].some((l, i) => [...ignore, ...posIgnore[i]].includes(l))) {
        return false
    }
    if (wordMust.some((l) => ![...word].includes(l))) {
        return false
    }
    for (const pos in posMust) {
        if (word[pos] !== posMust[pos]) {
            return false
        }
    }
    return true
}

const makeCombos = (word) => {
    return [...word]
}

module.exports = async (used = {}, words = []) => {
    const f = filer(used)

    const filtered = words.filter(f)

    const counts = {}
    for (const word of words) {
        const combos = makeCombos(word)
        for (const combo of combos) {
            if (counts[combo] === undefined) {
                counts[combo] = 0
            }
            counts[combo] += combo.length
        }
    }
    const scores = {}
    for (const word of filtered) {
        const combos = makeCombos(word)
        scores[word] = combos.reduce(
            (t, combo) =>
                t + (counts[combo] || 0) * new Set([...combo, ...word]).size,
            0
        )
    }

    return filtered.sort((a, b) => scores[b] - scores[a]).shift()
}
