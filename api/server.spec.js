const request = require('supertest');

const db = require('../database/dbConfig.js');

const server = require('./server.js');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return 200 ok', function() {
            return request(server).get('/').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('should return HTML', function() {
            return request(server).get('/').then(res=>{
                expect(res.type).toMatch(/html/i);
            })
        })

        it('should return "Its alive!"', function() {
            return request(server).get('/').then(res=>{
                expect(res.text).toEqual("It's alive!");
            })
        })
    })

    describe('GET /api/auth', function() {
        it('should return 200 ok', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('should return HTML', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.type).toMatch(/html/i);
            })
        })

        it('should return "Its alive!"', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.text).toEqual("This is the auth route");
            })
        })
    })
    describe('POST /api/auth/register', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('should return 201', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('should return username', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.username).toEqual('TestRegister')
                })
        })
    })
    let cookies;
    let token;
    describe('POST /api/auth/login', function() {
        it('should return 201 ok', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('should return token, cookie, user data', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.username).toEqual('TestRegister')
                    expect(res.body.token).toBeDefined()
                    token = res.body.token
                    expect(res.headers).toHaveProperty("set-cookie");
                    cookies = res.headers["set-cookie"].pop().split(";")[0];
                    console.log('cookies:', cookies)
                    console.log('token:', token)
                })
        })
    })
    describe('GET /api/users', function() {
        it('should return 200 ok', function() {
            return request(server)
                .get('/api/users')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('should return list of users', function() {
            return request(server)
                .get('/api/users')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    console.log('should return list of users:', res.body)
                })
        })
    })
    describe('GET /api/jokes', function() {
        it('should return 200', function() {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('should return list of jokes', function() {
            return request(server)
                .get('/api/jokes')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    // console.log(res.body)
                })
        })
    })        
})