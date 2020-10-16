const fs = require('fs')
let wordlist1 = []
let wordlist2 = []

fs.readFile('./wordlist/wordlist_UK.txt', 'utf8', (err, data) =>{
    data = data.split('\n')
    
    for(let i=0;i<data.length;++i){
        if( (data[i][0]>='a' && data[i][0]<='z')){
            wordlist1.push(data[i])
        }
    }

    console.log(wordlist1)

})

fs.readFile('./wordlist/wordlist_US.txt', 'utf8', (err, data) =>{
    data = data.split('\n')
    
    for(let i=0;i<data.length;++i){
        if( (data[i][0]>='a' && data[i][0]<='z')){
            wordlist2.push(data[i])
        }
    }

    console.log(wordlist2)

})

let total_wordlist = wordlist1.concat(wordlist2)
console.log(total_wordlist)