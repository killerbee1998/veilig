let passFlagsChecker = (flags) =>{
    let correctFlags = true

    if (flags.length != 3) {
        correctFlags = false
    }

    if (!(flags[0] == '0' || flags[0] == '1')) {
        correctFlags = false
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        correctFlags = false
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        correctFlags = false
    }

    return correctFlags
}

module.exports.passFlagsChecker = passFlagsChecker