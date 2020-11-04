// express
const express = require("express")
const storeRoutes = express.Router()

// knex db
const knex = require('knex')

// json web token
const jwt = require('jsonwebtoken')

// aes256
const aes = require('aes256')

storeRoutes.post('/savePass', async(req,res)=>{
    const {user_url, user_name, user_pass, token, authKey} = req.body

    let master_email = ''
    let master_pass = ''
    try{
        const {email, pass} = jwt.verify(token, authKey)
        master_email = email
        master_pass = pass
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

    let user_data ={
        master_email: master_email,
        user_url: user_url,
        user_name: user_name,
        user_pass: aes.encrypt(master_pass,user_pass)
    }

    try{
        let result = await pg('store').insert(user_data)
        res.status(200).json("PASSWORD SAVED")
    }catch{
        res.status(400).json("PASSWORD SAVE ERROR")
    }

    pg.destroy()
    return
    
    
})

storeRoutes.post('/displayPass', async(req,res)=>{
    const {token, authKey} = req.body

    let master_email = ''
    let master_pass = ''
    try{
        const {email, pass} = jwt.verify(token, authKey)
        master_email = email
        master_pass = pass
    }catch{
        res.status(400).json("PASSWORD DISPLAY ERROR")
        return
    }

    const pg = knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL
        }
    });

    try{
        let result = await pg.select('store_id', 'user_pass').from('store').where({master_email: master_email})
        result = result.map(store_data => {
            let a ={ store_id: store_data.store_id,
                    user_pass: aes.decrypt(master_pass, store_data.user_pass)
                }
            return a
        })
        res.status(200).json(result)
    }catch{
        res.status(400).json("PASSWORD DISPLAY ERROR")
    }

    pg.destroy()
    return  
})

storeRoutes.post('/delPass', async(req,res)=>{
    const {token, authKey, store_id} = req.body

    let master_email = ''
    let master_pass = ''
    try{
        const {email, pass} = jwt.verify(token, authKey)
        master_email = email
        master_pass = pass
    }catch{
        res.status(400).json("PASSWORD DELETETION ERROR")
        return
    }

    const pg = knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL
        }
    });

    try{
        let result = await pg('store').where({store_id: store_id}).del()
        res.status(200).json("PASSWORD DELETED");
    }catch(err){
        res.status(400).json("PASSWORD DELETETION ERROR")
    }

    pg.destroy()
    return

})

module.exports = storeRoutes