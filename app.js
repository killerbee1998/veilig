// express
const express = require("express")
const { passgen } = require("./passgen")
const app = express()

// root 
app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

// pass func
app.get('/pass/len=:len/flags=:flags', (req, res) =>{
    let {len, flags} = req.params
    const passgen = require('./passgen')
    const pass = passgen.passgen(len, flags)

    res.status(200).json(pass)
})

module.exports.app = app