const app = require('./src/app').app
const pg = require("./src/app").pg
const req = require('supertest')

describe('Root path', () =>{
    test("Root Path", async () =>{
        const res = await req(app).get('/')
        expect(res.statusCode).toBe(200)      
    })
})

describe('pass/', () =>{
    test("pass/ with no args", async () =>{
        const res = await req(app).get('/pass/')
        expect(res.statusCode).toBe(200)
    })
})

describe('pass/len', () =>{
    test("pass/len with len=5", async () =>{
        const res = await req(app).get('/pass/len=5/')
        expect(res.statusCode).toBe(200)
    })

    test("pass/len with len<5", async () =>{
        const res = await req(app).get('/pass/len=2/')
        expect(res.statusCode).toBe(400)
    })


    test("pass/len with len>200", async () =>{
        const res = await req(app).get('/pass/len=220/')
        expect(res.statusCode).toBe(400)
    })
})

describe('pass/passFlags', () =>{

    test("flags=000", async () =>{
        const res = await req(app).get('/pass/passFlags=000/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=001", async () =>{
        const res = await req(app).get('/pass/passFlags=001/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=010", async () =>{
        const res = await req(app).get('/pass/passFlags=010/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=011", async () =>{
        const res = await req(app).get('/pass/passFlags=011/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=100", async () =>{
        const res = await req(app).get('/pass/passFlags=100/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=101", async () =>{
        const res = await req(app).get('/pass/passFlags=101/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=110", async () =>{
        const res = await req(app).get('/pass/passFlags=110/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=111", async () =>{
        const res = await req(app).get('/pass/passFlags=111/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=01", async () =>{
        const res = await req(app).get('/pass/passFlags=01/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=1", async () =>{
        const res = await req(app).get('/pass/passFlags=1/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=000000", async () =>{
        const res = await req(app).get('/pass/passFlags=000000/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=aaa", async () =>{
        const res = await req(app).get('/pass/passFlags=aaa/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=a", async () =>{
        const res = await req(app).get('/pass/passFlags=a/')
        expect(res.statusCode).toBe(400)
    })

})


describe('passphrase/n_words', () =>{
    test("n_words=3", async () =>{
        const res = await req(app).get('/passphrase/n_words=3/')
        expect(res.statusCode).toBe(200)
    })

    test("n_words=1", async () =>{
        const res = await req(app).get('/passphrase/n_words=1/')
        expect(res.statusCode).toBe(400)
    })

    test("n_words=100", async () =>{
        const res = await req(app).get('/passphrase/n_words=100/')
        expect(res.statusCode).toBe(400)
    })
 
})

describe('passphrase/passFlags', () =>{

    test("flags=000", async () =>{
        const res = await req(app).get('/passphrase/passFlags=000/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=001", async () =>{
        const res = await req(app).get('/passphrase/passFlags=001/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=010", async () =>{
        const res = await req(app).get('/passphrase/passFlags=010/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=011", async () =>{
        const res = await req(app).get('/passphrase/passFlags=011/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=100", async () =>{
        const res = await req(app).get('/passphrase/passFlags=100/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=101", async () =>{
        const res = await req(app).get('/passphrase/passFlags=101/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=110", async () =>{
        const res = await req(app).get('/passphrase/passFlags=110/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=111", async () =>{
        const res = await req(app).get('/passphrase/passFlags=111/')
        expect(res.statusCode).toBe(200)
    })

    test("flags=01", async () =>{
        const res = await req(app).get('/passphrase/passFlags=01/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=1", async () =>{
        const res = await req(app).get('/passphrase/passFlags=1/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=000000", async () =>{
        const res = await req(app).get('/passphrase/passFlags=000000/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=aaa", async () =>{
        const res = await req(app).get('/passphrase/passFlags=aaa/')
        expect(res.statusCode).toBe(400)
    })

    test("flags=a", async () =>{
        const res = await req(app).get('/passphrase/passFlags=a/')
        expect(res.statusCode).toBe(400)
    })

})

describe("All login func", ()=>{
    const user_body = {
        "email": "a@a",
        "pass": "A"
    }

    const user_only_email = {"email": "a@a"}
    const user_only_pass = {"pass": "A"}

    test("Register with user_only_email", async() =>{
        const res = await req(app).post('/register').send(user_only_email)
        expect(res.statusCode).toBe(400)
    })

    test("Register with user_only_pass", async() =>{
        const res = await req(app).post('/register').send(user_only_pass)
        expect(res.statusCode).toBe(400)
    })

    test("Register with user_body", async() =>{
        const res = await req(app).post('/register').send(user_body)
        expect(res.statusCode).toBe(200)
    })

    test("Register with user_body again", async() =>{
        const res = await req(app).post('/register').send(user_body)
        expect(res.statusCode).toBe(400)
    })

    test("Login with user_only_email", async() =>{
        const res = await req(app).post('/login').send(user_only_email)
        expect(res.statusCode).toBe(400)
    })

    test("Login with user_only_pass", async() =>{
        const res = await req(app).post('/login').send(user_only_pass)
        expect(res.statusCode).toBe(400)
    })

    test("Login with user_body", async() =>{
        const res = await req(app).post('/login').send(user_body)
        expect(res.statusCode).toBe(200)
    })

    test("Delete user_body acc", async() =>{
        const res = await req(app).post('/del_acc').send(user_body)
        expect(res.statusCode).toBe(200)
    })
})