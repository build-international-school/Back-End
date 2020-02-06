const Workers = require('./workers-model.js');

const db = require('../database/dbConfig.js');

describe('Workers model', function() {

    describe('test environment', function(){
        it('should run in testing', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('add()', function() {
        beforeEach(async () => {
            await db('workers').truncate();
        })
        it('adds user to database', async function(){
            await Workers.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type: 'worker'});
            await Workers.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type: 'worker'});
            await Workers.add({first_name:'Test3', last_name:'Tester', email:'test3@test.com', password:'Not null', type: 'worker'});
            const workers = await db('workers');
            
            expect(workers).toHaveLength(3);
        })
    
    })

    describe('remove()', function() {
        beforeEach(async () => {
            await db('workers').truncate();
        })
        it('removes user by id', async function() {
            // check table empty
            const workersEmpty = await db('workers')
            expect(workersEmpty).toHaveLength(0);

            await Workers.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type: 'worker'});
            await Workers.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type: 'worker'});
            const workersAdded = await db('workers')
            expect(workersAdded).toHaveLength(2);

            await Workers.remove(1)
            const workers = await db('workers');
            expect(workers).toHaveLength(1);
        })
    })

    describe('findById()', function() {
        beforeEach(async () => {
            await db('workers').truncate();
        })
        it('finds user by id', async function(){
            await Workers.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type: 'worker'});
            await Workers.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type: 'worker'});
            await Workers.add({first_name:'Test3', last_name:'Tester', email:'test3@test.com', password:'Not null', type: 'worker'});

            const workers = await db('workers');
            
            expect(workers).toHaveLength(3);

            const worker = await Workers.findById(3)
            expect(worker).toEqual({ id:3, first_name:'Test3', last_name:'Tester', email:'test3@test.com', organization: null, phone: null, type: 'worker' });
        })
    
    })
})