function truncate (str, maxLen) {
    if (str.length > maxLen) {
        return str.slice(0, maxLen) + '...'
    }
}

function choose ([tochoose]) {
        const returned = tochoose[Math.floor(math.random()*tochoose.length)]
        return returned
}

module.exports.truncate = truncate
module.exports.choose = choose

