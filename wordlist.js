const {PythonShell} = require('python-shell')

let options = {
    mode: 'text',
    pythonPath: 'path/to/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: 'wordlist.py',
    args: ['value1', 'value2', 'value3']
};

let wordlist = ''

PythonShell.run('words.py', null, (err, res) =>{
    wordlist = res
    console.log(wordlist)
})

console.log(wordlist)