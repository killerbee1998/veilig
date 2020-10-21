// express
const express = require("express")
const { passgen } = require("./passgen")
const app = express()

// root 
app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

// password func(MAIN)
app.get('/pass/len=:len/passFlags=:flags', (req, res) =>{
    let {len, flags} = req.params

    if(len < 5 || len > 200){
        res.send(400).json("Length out of bounds")
    }

    if(flags.length != 3){
        res.send(400).json("Incorrect passFLags format")
    }

    if( !(flags[0] == '0' || flags[0]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }

    const passgen = require('./passgen')
    const pass = passgen.passgen(len, flags)

    res.status(200).json(pass)
})

// passfunc(alt routes)
app.get('/pass/len=:len/', (req, res) =>{
    let {len} = req.params

    if(len < 5 || len > 200){
        res.send(400).json("Length out of bounds")
    }

    const passgen = require('./passgen')
    const pass = passgen.passgen(len, '111')

    res.status(200).json(pass)
})

app.get('/pass/passFlags=:flags', (req, res) =>{
    let {flags} = req.params

    if(flags.length != 3){
        res.send(400).json("Incorrect passFLags format")
    }

    if( !(flags[0] == '0' || flags[0]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    const passgen = require('./passgen')
    const pass = passgen.passgen('10', flags)

    res.status(200).json(pass)
})

app.get('/pass', (req, res) =>{
    const passgen = require('./passgen')
    const pass = passgen.passgen('10', '111')

    res.status(200).json(pass)
})



// passphrase func
app.get('/passphrase/n_words=:n_words/passFlags=:flags', (req, res)=>{
    let {n_words, flags} = req.params


    if(n_words < 3 || n_words > 20){
        res.send(400).json("Length out of bounds")
    }

    if(flags.length != 3){
        res.send(400).json("Incorrect passFLags format")
    }

    if( !(flags[0] == '0' || flags[0]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }
    if( !(flags[1] == '0' || flags[1]=='1')){
        res.send(400).json("Incorrect passFlags format")
    }

    const get_word = require('./get_word')

    let passphrase = ''
    for(let i=0;i<n_words-1;++i){
        passphrase += get_word.get_random_word(flags)+'-'
    }
    passphrase += get_word.get_random_word(flags)

    res.status(200).json(passphrase)
})

// passphrase function(alt routes)
app.get('/passphrase/n_words=:n_words', (req, res)=>{
    let {n_words, flags} = req.params
    const get_word = require('./get_word')

    let passphrase = ''
    for(let i=0;i<n_words-1;++i){
        passphrase += get_word.get_random_word('000')+'-'
    }
    passphrase += get_word.get_random_word('000')

    res.status(200).json(passphrase)
})


app.get('/passphrase/passFlags=:flags', (req, res)=>{
    let {flags} = req.params
    const get_word = require('./get_word')

    let passphrase = ''
    for(let i=0;i<2;++i){
        passphrase += get_word.get_random_word(flags)+'-'
    }
    passphrase += get_word.get_random_word(flags)

    res.status(200).json(passphrase)
})

app.get('/passphrase/', (req, res)=>{
    const get_word = require('./get_word')

    let passphrase = ''
    for(let i=0;i<2;++i){
        passphrase += get_word.get_random_word('000')+'-'
    }
    passphrase += get_word.get_random_word('000')

    res.status(200).json(passphrase)
})

module.exports.app = app