// express
const express = require("express")
const app = express()

// root 
app.get('/', (req, res) =>{
    res.status(200).json("This is root path")
})

// pass func
app.get('/pass/len=:len/flags=:flags', (req, res) =>{
    let {len, flags} = req.params
    len = parseInt(len)

    // flags to toggle numbers, special characters & capital letters
    // 0 is off, 1 is on
    let if_nums = parseInt(flags[0])
    let if_specials = parseInt(flags[1]) 
    let if_caps = parseInt(flags[2])

    let pass = ""
    let max = 122, min = 48

    if(if_nums === 0){
        min = 58
    }

    for(let i=0;i<len;++i){
        passCharCode = Math.random() * (max - min) + min

        if(if_specials === 0){
            while( (passCharCode >=58 || passCharCode<=64) ){
                Math.random() * (max - min) + min
            }
            
            while( (passCharCode >=91 || passCharCode<=96) ){
                Math.random() * (max - min) + min
            }

            while( (passCharCode >=123 || passCharCode<=126) ){
                Math.random() * (max - min) + min
            }
            
            
        }

        pass += String.fromCharCode(passCharCode)
    }
    res.status(200).json(pass)
})

module.exports.app = app