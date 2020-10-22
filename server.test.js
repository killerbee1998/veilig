const app = require('./src/app').app
const req = require('supertest')

describe('Root path', () =>{
    test("Root Path", async () =>{
        const res = await req(app).get('/')
        expect(res.statusCode).toBe(200)      
    })
})