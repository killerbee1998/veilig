const {PythonShell} = require('python-shell')
const pyShell = new PythonShell('words.py')

let wordlist = ''

pyShell.on('message', (msg)=>{
    wordlist = msg
    console.log(wordlist)
})


pyShell.end( (err) =>{
    if(err){
        throw err
    }
})