// express
const express = require("express")
const app = express()

// knex db
const knex = require('knex')
const pg = knex({
  client: 'pg',
  connection: {
      connectionString: process.env.DATABASE_URL
  }
});

// cors
const cors = require('cors')
app.use(cors())

//bcrypt
const bcrypt = require('bcrypt');
const hashStr = 10;

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// local modules
const {passgen} = require("./passgen")

// root 
app.get('/', (req, res) => {
    res.status(200).json("This is root path")
})

// password func(MAIN)
app.get('/pass/len=:len/passFlags=:flags', (req, res) => {
    let {len,flags} = req.params

    if (len < 5 || len > 200) {
        res.send(400).json("Length out of bounds")
    }

    if (flags.length != 3) {
        res.send(400).json("Incorrect passFLags format")
    }

    if (!(flags[0] == '0' || flags[0] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }

    const passgen = require('./passgen')
    const pass = passgen.passgen(len, flags)

    res.status(200).json(pass)
})

// passfunc(alt routes)
app.get('/pass/len=:len/', (req, res) => {
    let {len} = req.params

    if (len < 5 || len > 200) {
        res.send(400).json("Length out of bounds")
    }

    const passgen = require('./passgen')
    const pass = passgen.passgen(len, '111')

    res.status(200).json(pass)
})

app.get('/pass/passFlags=:flags', (req, res) => {
    let {flags} = req.params

    if (flags.length != 3) {
        res.send(400).json("Incorrect passFLags format")
    }

    if (!(flags[0] == '0' || flags[0] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    const passgen = require('./passgen')
    const pass = passgen.passgen('10', flags)

    res.status(200).json(pass)
})

app.get('/pass', (req, res) => {
    const passgen = require('./passgen')
    const pass = passgen.passgen('10', '111')

    res.status(200).json(pass)
})



// passphrase func
app.get('/passphrase/n_words=:n_words/passFlags=:flags', (req, res) => {
    let {n_words,flags} = req.params

    if (n_words < 3 || n_words > 20) {
        res.send(400).json("Length out of bounds")
    }

    if (flags.length != 3) {
        res.send(400).json("Incorrect passFLags format")
    }

    if (!(flags[0] == '0' || flags[0] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }

    const get_word = require('./get_word')

    let passphrase = ''
    for (let i = 0; i < n_words - 1; ++i) {
        passphrase += get_word.get_random_word(flags) + '-'
    }
    passphrase += get_word.get_random_word(flags)

    res.status(200).json(passphrase)
})

// passphrase function(alt routes)
app.get('/passphrase/n_words=:n_words', (req, res) => {
    let {n_words} = req.params

    if (n_words < 3 || n_words > 20) {
        res.send(400).json("Length out of bounds")
    }

    const get_word = require('./get_word')

    let passphrase = ''
    for (let i = 0; i < n_words - 1; ++i) {
        passphrase += get_word.get_random_word('000') + '-'
    }
    passphrase += get_word.get_random_word('000')

    res.status(200).json(passphrase)
})


app.get('/passphrase/passFlags=:flags', (req, res) => {
    let {flags} = req.params

    if (flags.length != 3) {
        res.send(400).json("Incorrect passFLags format")
    }

    if (!(flags[0] == '0' || flags[0] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }
    if (!(flags[1] == '0' || flags[1] == '1')) {
        res.send(400).json("Incorrect passFlags format")
    }

    const get_word = require('./get_word')

    let passphrase = ''
    for (let i = 0; i < 2; ++i) {
        passphrase += get_word.get_random_word(flags) + '-'
    }
    passphrase += get_word.get_random_word(flags)

    res.status(200).json(passphrase)
})

app.get('/passphrase/', (req, res) => {
    const get_word = require('./get_word')

    let passphrase = ''
    for (let i = 0; i < 2; ++i) {
        passphrase += get_word.get_random_word('000') + '-'
    }
    passphrase += get_word.get_random_word('000')

    res.status(200).json(passphrase)
})

// user signin function
app.post('/login', async (req, res) => {

    const {email,password} = req.body;

    if (email === null || password === null) {
        res.json("Empty Email or password");
    }

    const userData = await pg.select('*').from('users').where({
        user_id: email
    })

    const signinSuccess = bcrypt.compareSync(password, userData[0].pass_hash);

    if (signinSuccess) {
        const mockUser = {
            email: userData[0].user_id,
            name: userData[0].name
        }
        res.status(200).json(mockUser)
    } else {
        res.status(400).json("SIGNIN ERROR")
    }
})

//register func
app.post("/register", (req, res) => {

    const {email, pass } = req.body;
    let master_hash = bcrypt.hashSync(pass, hashStr);
    
    if (email === null || pass === null) {
        res.json("Empty Email or password");
    }
  
    let new_user = {
        master_email: email,
        master_hash: master_hash
    }
  
    pg('master')
    .insert(new_user)
    .then( () =>{
        res.status(200).json("REGISTERED");
    })
    .catch( (err) =>{
        res.status(400).json("REGISTRATION ERROR")
    });
  
})
  
module.exports.app = app