// express
const express = require("express")
const storeRoutes = express.Router()

// knex db
const knex = require('knex')

// json web token
const jwt = require('jsonwebtoken')

storeRoutes.post('/savePass', (req,res)=>{
    const {user_url, user_name, user_pass, token, authKey} = req.body
    
    try{
        let master_email = jwt.verify(token)
        
        const pg = knex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL
            }
        });
        
    }catch{

    }
})

module.exports = storeRoutes