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

        it('should return "Server is online"!', function() {
            return request(server).get('/').then(res=>{
                expect(res.text).toEqual("<h2>Server is online!</h2><br><div>Visit: <a href='https://github.com/build-international-school/Back-End'>https://github.com/build-international-school/Back-End</a> for more API info.</div>");
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

        it('should return "Auth route success"', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.text).toEqual("Auth route success");
            })
        })
    })
    describe('POST /api/auth/register/admins', function() {
        beforeEach(async () => {
            await db('admins').truncate();
        })
        it('should return 201', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ first_name: 'Test', last_name:'Register', email:'test@test.com', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('should return username', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ first_name: 'Test', last_name:'Register', email:'test@test.com', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.first_name).toEqual('Test')
                })
        })
    })
    describe('POST /api/auth/register/workers', function() {
        beforeEach(async () => {
            await db('workers').truncate();
        })
        it('should return 201', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ first_name: 'Test', last_name:'Worker', email:'test@test.com', password: 'testing', type: 'worker'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('should return username', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ first_name: 'Test', last_name:'Worker', email:'test@test.com', password: 'testing', type: 'worker'})
                .then(res=>{
                    expect(res.body.last_name).toEqual('Worker')
                })
        })
    })
    let cookies;
    let token;
    describe('POST /api/auth/login', function() {
        it('should return 201 ok', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ email: 'test@test.com', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
        it('should return token, cookie, user data', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ email: 'test@test.com', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.body.first_name).toEqual('Test')
                    expect(res.body.token).toBeDefined()
                    token = res.body.token
                    expect(res.headers).toHaveProperty("set-cookie");
                    cookies = res.headers["set-cookie"].pop().split(";")[0];
                    console.log('cookies:', cookies)
                    console.log('token:', token)
                })
        })
    })
    describe('GET /api/admins', function() {
        it('should return 200 ok', function() {
            return request(server)
                .get('/api/admins')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('should return list of admins', function() {
            return request(server)
                .get('/api/admins')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    // console.log('should return list of admins:', res.body)
                })
        })
    })
    describe('GET /api/workers', function() {
        it('should return 200 ok', function() {
            return request(server)
                .get('/api/workers')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('should return list of workers', function() {
            return request(server)
                .get('/api/workers')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    // console.log('should return list of admins:', res.body)
                })
        })
    })
    describe('GET /api/students', function() {
        it('should return 200', function() {
            return request(server)
                .get('/api/students')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })
        it('should return list of students', function() {
            return request(server)
                .get('/api/students')
                .set('Authorization', token)
                .set('Cookie', [cookies])
                .then(res=>{
                    expect(res.body).toBeDefined()
                    // console.log(res.body)
                })
        })
    })        
})