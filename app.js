// express
const express = require("express")
const app = express()

app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

app.get('/pass/len=:len/flags=:flags', (req, res) =>{
    let {len, flags} = req.params
    len = parseInt(len)

    let pass = ""
    for(let i=0;i<len;++i){
        pass += String.fromCharCode(Math.random() * (122 - 48) + 48)
    }
    res.status(200).json(pass)
})

module.exports.app = app