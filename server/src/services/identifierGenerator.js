const base62 =
    [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]

exports.generateIdentifier = function () {
    // just take a random char from the base62 array, do that six times and join the chars to a string - et voila!
    return Array.from({length:6}, (x,i) => {
        return base62[randomInt()]
    }).join("")
}

function randomInt() {
    // so this only generates values between 0 and 61
    return Math.floor(Math.random() * 62)
}