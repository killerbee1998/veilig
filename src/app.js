// express
const express = require("express")
const app = express()

// cors
const cors = require('cors')
app.use(cors())

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// root 
app.get('/', (req, res) => {
    res.status(200).json("This is root path")
})

// load password generation routes
app.use('/passphrase', require('./genPass/routes/passphraseRoutes'))
app.use('/pass', require('./genPass/routes/passRoutes'))

// load account routes
app.use('/account', require('./account/accountRoutes'))

// load store routes
app.use('/store', require('./store/storeRoutes'))
  
module.exports.app = app