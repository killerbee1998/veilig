// express
const express = require("express")
const passRoutes = express.Router()

// local modules
const {passgen} = require("./gen_pass/passGen")
const {passFlagsChecker} = require('./gen_pass/passFlagsChecker')

// password func(MAIN)
passRoutes.get('/len=:len/passFlags=:flags', (req, res) => {
    let {len,flags} = req.params

    if (len < 5 || len > 200) {
        res.send(400).json("Length out of bounds")
    }

    if(!(passFlagsChecker(flags))){
        res.send(400).json("Incorrect passFlags format")
    }

    const pass = passgen(len, flags)

    res.status(200).json(pass)
})

// passfunc(alt routes)
passRoutes.get('/len=:len/', (req, res) => {
    let {len} = req.params

    if (len < 5 || len > 200) {
        res.send(400).json("Length out of bounds")
    }

    const pass = passgen(len, '111')

    res.status(200).json(pass)
})

passRoutes.get('/passFlags=:flags', (req, res) => {
    let {flags} = req.params

    if(!(passFlagsChecker(flags))){
        res.send(400).json("Incorrect passFlags format")
    }
    const pass = passgen('10', flags)

    res.status(200).json(pass)
})

passRoutes.get('/', (req, res) => {
    
    const pass = passgen('10', '111')

    res.status(200).json(pass)
})

module.exports = passRoutes