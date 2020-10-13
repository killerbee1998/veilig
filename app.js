// express
const express = require("express")
const app = express()

app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

app.get('/pass/len=:len/flags=:flags', (req, res) =>{
    const {len, flags} = req.params
})

module.exports.app = app