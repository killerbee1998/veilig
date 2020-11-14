// express
const express = require("express")
const accountRoutes = express.Router()

// knex db
const knex = require('knex')

// json web token
const jwt = require('jsonwebtoken')

//bcrypt
const bcrypt = require('bcrypt');
const hashStr = 10;

// user login function(Main)
accountRoutes.post('/login', async (req, res) => {

    const {email,pass} = req.body;

    if (email === null || pass === null || email === undefined || pass === undefined) {
        res.status(400).json("LOGIN ERROR");
        return
    }else{
        const pg = knex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL
            }
        });

        const userData = await pg.select('*').from('master').where({
            master_email: email
        })

        if(userData === null || userData === undefined || userData.length === 0){
            res.status(400).json("LOGIN ERROR");
            pg.destroy()
            return
        }
        
        const signinSuccess = await bcrypt.compare(pass, userData[0].master_hash);
    
        if (signinSuccess) {
            let authKey = ""
            for(let i=0;i<13;++i){
                authKey += String.fromCharCode(Math.random() * (122-98)+ 97)
            }

            const token = jwt.sign({ email: email, pass:pass }, authKey);
            res.status(200).json({token: token, key: authKey})
        } else {
            res.status(400).json("LOGIN ERROR")
        }
        
        pg.destroy()
        return

    }

})

//register func
accountRoutes.post("/register", async (req, res) => {

    const {email, pass } = req.body;
    if (email === null || pass === null || email === undefined || pass === undefined) {
        res.status(400).json("Empty Email or password");
        return
    }else{

        const pg = knex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL
            }
        });

        let master_hash = await bcrypt.hash(pass, hashStr);
  
        let new_user = {
            master_email: email,
            master_hash: master_hash
        }
        
        try{
            let result = await pg('master').insert(new_user)
            res.status(200).json("REGISTERED");
        }catch(err){
            res.status(400).json("REGISTRATION ERROR")
        }
        
        pg.destroy()
        return

    }
      
})

//delete account func
accountRoutes.post("/del_acc", async(req, res) => {

    const {email,pass} = req.body;

    if (email === null || pass === null || email === undefined || pass === undefined) {
        res.status(400).json("Empty Email or password");
        return
    }else{

        const pg = knex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL
            }
        });

        const userData = await pg.select('*').from('master').where({
            master_email: email
        })

        if(userData === null || userData === undefined || userData.length === 0){
            res.status(400).json("ACCOUNT DELETETION ERROR");
            pg.destroy()
            return
        }
    
        const userFound = await bcrypt.compare(pass, userData[0].master_hash);
    
        if (userFound) {
            try{
                let result = await pg('master').where({master_email: email}).del()
                res.status(200).json("ACCOUNT DELETED");
            }catch(err){
                res.status(400).json("ACCOUNT DELETETION ERROR")
            }

            pg.destroy()
            return
            
        } else {
            res.status(400).json("ACCOUNT DELETETION ERROR")
            pg.destroy()
            return
        }
    
    }
  
})

module.exports = accountRoutes