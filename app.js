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

            let p = [0,0,0]
            if(if_nums === 0){
                p[0] = Math.random() * (57 - 48) + 48
            }

            if(if_caps === 0){
                p[1] = Math.random() * (90 - 65) + 65
            }

            p[2] = Math.random() * (122 - 97) + 97

            if(p[0] !== 0 && p[1] !== 0){
                passCharCode =  p[Math.ceil(Math.random() * 2)]
            }else if(p[0] !== 0 && p[1] === 0){
                let rands = Math.ceil(Math.random())
                if(rands === 0){
                    passCharCode = p[0]
                }else{
                    passCharCode = p[2]
                }
            }else if(p[0] === 0 && p[1] !== 0){
                let rands = Math.ceil(Math.random())
                if(rands === 0){
                    passCharCode = p[1]
                }else{
                    passCharCode = p[2]
                }
            }else{
                passCharCode = p[2]
            }
            
            
        }

        if(if_caps === 0){

            let p = [0,0,0,0]
            if(if_nums !== 0){
                p[0] = Math.random() * (57 - 48) + 48
            }

            if(if_specials !== 0 ){
                p[1] = Math.random() * (58 - 64) + 58
                p[2] = Math.random() * (96 - 91) + 91
            }

            p[3] = Math.random() * (122 - 97) + 97

            if(p[0] !== 0 && p[1] !== 0 && p[2] !== 0){
                passCharCode =  p[Math.ceil(Math.random() * 3)]
            }else if(p[0] !== 0 && p[1] === 0 && p[2] === 0){
                let rands = Math.ceil(Math.random())
                if(rands === 0){
                    passCharCode = p[0]
                }else{
                    passCharCode = p[3]
                }
            }else if(p[0] === 0 && p[1] !== 0 && p[2] !== 0){
                let rands = Math.ceil(Math.random() * 2)
                print(rands)
                if(rands === 0){
                    passCharCode = p[1]
                }else if(rands === 1){
                    passCharCode = p[2]
                }else{
                    passCharCode = p[3]
                }
            }else{
                passCharCode = p[2]
            }
            
            
        }

        pass += String.fromCharCode(passCharCode)
    }
    res.status(200).json(pass)
})

module.exports.app = app