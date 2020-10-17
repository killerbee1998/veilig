// express
const express = require("express")
const { passgen } = require("./passgen")
const app = express()

// root 
app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

// password func
app.get('/pass/len=:len/passFlags=:flags', (req, res) =>{
    let {len, flags} = req.params
    const passgen = require('./passgen')
    const pass = passgen.passgen(len, flags)

    res.status(200).json(pass)
})


// passphrase func
app.get('/passphrase/n_words=:n_words', (req, res)=>{
    let {n_words} = req.params
    const get_word = require('./get_word')

    let passphrase = ''
    for(let i=0;i<n_words;++i){
        passphrase += get_word.get_random_word()+'-'
    }

    res.status(200).json(passphrase)


})

module.exports.app = app