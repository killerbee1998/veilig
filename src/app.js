// express
const express = require("express")
const app = express()

// knex db
const knex = require('knex')

// cors
const cors = require('cors')
app.use(cors())

//bcrypt
const bcrypt = require('bcrypt');
const hashStr = 10;

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// root 
app.get('/', (req, res) => {
    res.status(200).json("This is root path")
})

// load password generation routes
app.use('/passphrase', require('./gen_pass/routes/passphraseRoutes'))
app.use('/pass', require('./gen_pass/routes/passRoutes'))

// user signin function
app.post('/login', async (req, res) => {

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
        
        const signinSuccess = bcrypt.compareSync(pass, userData[0].master_hash);
    
        if (signinSuccess) {
            const mockUser = {
                email: userData[0].master_email,
            }
            res.status(200).json(mockUser)
            pg.destroy()
            return
        } else {
            res.status(400).json("LOGIN ERROR")
            pg.destroy()
            return
        }

    }

})

//register func
app.post("/register", (req, res) => {

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

        let master_hash = bcrypt.hashSync(pass, hashStr);
  
        let new_user = {
            master_email: email,
            master_hash: master_hash
        }
        
        pg('master')
        .insert(new_user)
        .then( () =>{
            res.status(200).json("REGISTERED");
            pg.destroy()
            return
        })
        .catch( (err) =>{
            res.status(400).json("REGISTRATION ERROR")
            pg.destroy()
            return
        });
        
    }
      
})

//delete account func
app.post("/del_acc", async(req, res) => {

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
    
        const userFound = bcrypt.compareSync(pass, userData[0].master_hash);
    
        if (userFound) {
            pg('master')
            .where({master_email: email})
            .del()
            .then( () =>{
                res.status(200).json("ACCOUNT DELETED");
                pg.destroy()
                return
            })
            .catch( (err) =>{
                res.status(400).json("ACCOUNT DELETETION ERROR")
                pg.destroy()
                return
            });
            
        } else {
            res.status(400).json("ACCOUNT DELETETION ERROR")
            pg.destroy()
            return
        }
    
    }
  
})
  
module.exports.app = app