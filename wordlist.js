const {PythonShell} = require('python-shell')

let get_words = async() =>{
    let wordlist = ''

    const res = await PythonShell.run('words.py', null, (err, res) =>{
        console.log(res)
    })
}

get_words()