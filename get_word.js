const fs = require('fs')

const data = fs.readFileSync('./wordlist/all_words.txt', {encoding: 'utf-8', flag: 'r'}).split('\n')

const get_random_word = () =>{
    return data[Math.floor(Math.random() * (data.length+1))]
}

module.exports.get_random_word = get_random_word