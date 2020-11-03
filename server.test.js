const app = require('./src/app').app
const req = require('supertest')

describe('Root path', () =>{
    test("Root Path", async (done) =>{
        const res = await req(app).get('/')
        expect(res.statusCode).toBe(200)
        done()
    })
})

describe('pass/', () =>{
    test("pass/ with no args", async (done) =>{
        const res = await req(app).get('/pass/')
        expect(res.statusCode).toBe(200)
        done()
    })
})

describe('pass/len', () =>{
    test("pass/len with len=5", async (done) =>{
        const res = await req(app).get('/pass/len=5/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("pass/len with len<5", async (done) =>{
        const res = await req(app).get('/pass/len=2/')
        expect(res.statusCode).toBe(400)
        done()
    })


    test("pass/len with len>200", async (done) =>{
        const res = await req(app).get('/pass/len=220/')
        expect(res.statusCode).toBe(400)
        done()
    })
})

describe('pass/passFlags', () =>{

    test("flags=000", async (done) =>{
        const res = await req(app).get('/pass/passFlags=000/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=001", async (done) =>{
        const res = await req(app).get('/pass/passFlags=001/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=010", async (done) =>{
        const res = await req(app).get('/pass/passFlags=010/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=011", async (done) =>{
        const res = await req(app).get('/pass/passFlags=011/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=100", async (done) =>{
        const res = await req(app).get('/pass/passFlags=100/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=101", async (done) =>{
        const res = await req(app).get('/pass/passFlags=101/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=110", async (done) =>{
        const res = await req(app).get('/pass/passFlags=110/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=111", async (done) =>{
        const res = await req(app).get('/pass/passFlags=111/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=01", async (done) =>{
        const res = await req(app).get('/pass/passFlags=01/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=1", async (done) =>{
        const res = await req(app).get('/pass/passFlags=1/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=000000", async (done) =>{
        const res = await req(app).get('/pass/passFlags=000000/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=aaa", async (done) =>{
        const res = await req(app).get('/pass/passFlags=aaa/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=a", async (done) =>{
        const res = await req(app).get('/pass/passFlags=a/')
        expect(res.statusCode).toBe(400)
        done()
    })

})


describe('passphrase/n_words', () =>{
    test("n_words=3", async (done) =>{
        const res = await req(app).get('/passphrase/n_words=3/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("n_words=1", async (done) =>{
        const res = await req(app).get('/passphrase/n_words=1/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("n_words=100", async (done) =>{
        const res = await req(app).get('/passphrase/n_words=100/')
        expect(res.statusCode).toBe(400)
        done()
    })
 
})

describe('passphrase/passFlags', () =>{

    test("flags=000", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=000/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=001", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=001/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=010", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=010/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=011", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=011/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=100", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=100/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=101", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=101/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=110", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=110/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=111", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=111/')
        expect(res.statusCode).toBe(200)
        done()
    })

    test("flags=01", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=01/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=1", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=1/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=000000", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=000000/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=aaa", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=aaa/')
        expect(res.statusCode).toBe(400)
        done()
    })

    test("flags=a", async (done) =>{
        const res = await req(app).get('/passphrase/passFlags=a/')
        expect(res.statusCode).toBe(400)
        done()
    })

})

describe("All login func", ()=>{
    const user_body = {
        "email": "a@a",
        "pass": "A"
    }

    const user_body_wrong_pass = {
        "email": "a@a",
        "pass": "a"
    }

    const user_body_wrong_email = {
        "email": "A@A",
        "pass": "A"
    }

    const user_only_email = {"email": "a@a"}
    const user_only_pass = {"pass": "A"}

    test("Register with user_only_email", async(done) =>{
        const res = await req(app).post('/account/register').send(user_only_email)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Register with user_only_pass", async(done) =>{
        const res = await req(app).post('/account/register').send(user_only_pass)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Register with user_body", async(done) =>{
        const res = await req(app).post('/account/register').send(user_body)
        expect(res.statusCode).toBe(200)
        done()
    })

    test("Register with user_body again", async(done) =>{
        const res = await req(app).post('/account/register').send(user_body)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Login with user_only_email", async(done) =>{
        const res = await req(app).post('/account/login').send(user_only_email)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Login with user_only_pass", async(done) =>{
        const res = await req(app).post('/account/login').send(user_only_pass)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Login with user_body", async(done) =>{
        const res = await req(app).post('/account/login').send(user_body)
        expect(res.statusCode).toBe(200)
        done()
    })

    test("Login with user_body_wrong_pass", async(done) =>{
        const res = await req(app).post('/account/login').send(user_body_wrong_pass)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Login with user_body_wrong_email", async(done) =>{
        const res = await req(app).post('/account/login').send(user_body_wrong_email)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Delete Acc with user_only_email", async(done) =>{
        const res = await req(app).post('/account/del_acc').send(user_only_email)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Delete Acc with user_only_pass", async(done) =>{
        const res = await req(app).post('/account/del_acc').send(user_only_pass)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Delete acc user_body_wrong_pass", async(done) =>{
        const res = await req(app).post('/account/del_acc').send(user_body_wrong_pass)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Delete acc user_body_wrong_email", async(done) =>{
        const res = await req(app).post('/account/del_acc').send(user_body_wrong_email)
        expect(res.statusCode).toBe(400)
        done()
    })

    test("Delete acc user_body", async(done) =>{
        const res = await req(app).post('/account/del_acc').send(user_body)
        expect(res.statusCode).toBe(200)
        done()
    })
})

describe('Root path', () =>{
    test("Root Path", async (done) =>{
        const res = await req(app).get('/')
        expect(res.statusCode).toBe(200)
        done()
    })
})

describe('All Store Func', () =>{
    const user_body = {
        "email": "test@test",
        "pass": "test"
    }

    const user_data ={
        store_id: 'test',
        master_email: 'test@test',
        user_url: '',
        user_name: '',
        user_pass: 'test'
    }

    test('/store/savePass with invalid token', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let savePass_body = {
            user_url: '',
            user_name: '',
            user_pass: 'test',
            token: '',
            authKey: key
        }

        const savePass_res = await req(app).post('/store/savePass').send(savePass_body)
        expect(savePass_res.statusCode).toBe(400)
        done()
    })

    test('/store/savePass with invalid key', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let savePass_body = {
            user_url: '',
            user_name: '',
            user_pass: 'test',
            token: token,
            authKey: ''
        }

        const savePass_res = await req(app).post('/store/savePass').send(savePass_body)
        expect(savePass_res.statusCode).toBe(400)
        done()
    })

    test('/store/savePass with correct credentials', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let savePass_body = {
            user_url: '',
            user_name: '',
            user_pass: 'test',
            token: token,
            authKey: key
        }

        const savePass_res = await req(app).post('/store/savePass').send(savePass_body)
        expect(savePass_res.statusCode).toBe(200)
        done()
    })

    test('/store/displayPass with invalid token', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let displayPass_body = {
            token: '',
            authKey: key
        }

        const displayPass_res = await req(app).post('/store/displayPass').send(displayPass_body)
        expect(displayPass_res.statusCode).toBe(400)
        done()
    })

    test('/store/displayPass with invalid key', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let displayPass_body = {
            token: token,
            authKey: ''
        }

        const displayPass_res = await req(app).post('/store/displayPass').send(displayPass_body)
        expect(displayPass_res.statusCode).toBe(400)
        done()
    })

    test('/store/displayPass with correct credentials', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let displayPass_body = {
            token: token,
            authKey: key
        }

        const displayPass_res = await req(app).post('/store/displayPass').send(displayPass_body)
        expect(displayPass_res.statusCode).toBe(200)
        done()
    })

    test('/store/delPass with invalid token', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let delPass_body = {
            token: '',
            authKey: key,
            store_id: 1
        }

        const delPass_res = await req(app).post('/store/delPass').send(delPass_body)
        expect(delPass_res.statusCode).toBe(400)
        done()
    })

    test('/store/delPass with invalid key', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let delPass_body = {
            token: token,
            authKey: '',
            store_id: 1
        }

        const delPass_res = await req(app).post('/store/delPass').send(delPass_body)
        expect(delPass_res.statusCode).toBe(400)
        done()
    })

    test('/store/delPass with correct credentials', async(done) =>{
        const login_res = await req(app).post('/account/login').send(user_body)
        const {token, key} = JSON.parse(login_res.text)

        let delPass_body = {
            token: token,
            authKey: key,
            store_id: 1
        }

        const delPass_res = await req(app).post('/store/delPass').send(delPass_body)
        expect(delPass_res.statusCode).toBe(200)
        done()
    })
    
})