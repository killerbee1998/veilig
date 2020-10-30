// express
const express = require("express")
const passphraseRoutes = express.Router()

// local modules
const {get_random_word} = require('../utils/getWord')
const {passFlagsChecker} = require('../utils/passFlagsChecker')

// passphrase func
passphraseRoutes.get('/n_words=:n_words/passFlags=:flags', (req, res) => {
    let {n_words,flags} = req.params

    if (n_words < 3 || n_words > 20) {
        res.send(400).json("Length out of bounds")
    }

    if(!(passFlagsChecker(flags))){
        res.send(400).json("Incorrect passFlags format")
    }

    let passphrase = ''
    for (let i = 0; i < n_words - 1; ++i) {
        passphrase += get_random_word(flags) + '-'
    }
    passphrase += get_random_word(flags)

    res.status(200).json(passphrase)
})

// passphrase function(alt routes)
passphraseRoutes.get('/n_words=:n_words', (req, res) => {
    let {n_words} = req.params

    if (n_words < 3 || n_words > 20) {
        res.send(400).json("Length out of bounds")
    }

    let passphrase = ''
    for (let i = 0; i < n_words - 1; ++i) {
        passphrase += get_random_word('000') + '-'
    }
    passphrase += get_random_word('000')

    res.status(200).json(passphrase)
})


passphraseRoutes.get('/passFlags=:flags', (req, res) => {
    let {flags} = req.params
    
    if(!(passFlagsChecker(flags))){
        res.send(400).json("Incorrect passFlags format")
    }

    let passphrase = ''
    for (let i = 0; i < 2; ++i) {
        passphrase += get_random_word(flags) + '-'
    }
    passphrase += get_random_word(flags)

    res.status(200).json(passphrase)
})

passphraseRoutes.get('/', (req, res) => {

    let passphrase = ''
    for (let i = 0; i < 2; ++i) {
        passphrase += get_random_word('000') + '-'
    }
    passphrase += get_random_word('000')

    res.status(200).json(passphrase)
})

module.exports = passphraseRoutes