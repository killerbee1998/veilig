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
        master_email = jwt.verify(token, authKey)

    }catch{
        res.status(400).json("PASSWORD SAVE ERROR")
        return
    }

    const pg = knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL
        }
    });

    let store_id = ""
    for(let i=0;i<13;++i){
        store_id += String.fromCharCode(Math.random() * (122-98)+ 97)
    }

    let user_data ={
        store_id: store_id,
        master_email: master_email,
        user_url: user_url,
        user_name: user_name,
        user_pass: user_pass
    }

    try{
        let result = pg('store').insert(user_data)
        res.status(200).json("PASSWORD SAVED")
    }catch{
        res.status(400).json("PASSWORD SAVE ERROR")
    }

    pg.destroy()
    return
    
    
})

module.exports = storeRoutes