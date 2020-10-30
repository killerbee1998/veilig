const fs = require('fs')

const data = fs.readFileSync('./src/wordlist/all_words.txt', {encoding: 'utf-8', flag: 'r'}).split('\n')

const get_random_word = (flags) =>{
    let random_word = data[Math.floor(Math.random() * (data.length+1))]
    
    // flags to toggle numbers, special characters & capital letters
    // 0 is off, 1 is on
    let if_nums = parseInt(flags[0])
    let if_specials = parseInt(flags[1]) 
    let if_caps = parseInt(flags[2])

    if(if_nums === 1){
        let all_nums = '0123456789'
        random_word += all_nums[Math.floor(Math.random() * all_nums.length)]
    }

    if(if_specials === 1){
        let all_specials = ''

        for(let i=58;i<=64;++i){
            all_specials += String.fromCharCode(i)
        }

        let rd = Math.floor(Math.random() * all_specials.length)
        random_word += all_specials[rd]
    }

    // Capitalizes  the 1st letter
    if(if_caps === 1){
        let ss = random_word[0].charCodeAt() - 32
        random_word = random_word.replace(random_word[0], String.fromCharCode(ss))
    }

    return random_word
}

module.exports.get_random_word = get_random_word