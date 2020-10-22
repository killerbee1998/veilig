const app = require('./src/app').app
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
