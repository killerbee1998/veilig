// express
const express = require("express")
const storeRoutes = express.Router()

// knex db
const knex = require('knex')

// json web token
const jwt = require('jsonwebtoken')

storeRoutes.post('/savePass', (req,res)=>{
    const {user_url, user_name, user_pass, token, authKey} = req.body
    let master_email = ""

    try{
        master_email = jwt.verify(token)

    }catch{
        res.status(200).json("INVALID KEY ERROR")
        return
    }

})

module.exports = storeRoutes