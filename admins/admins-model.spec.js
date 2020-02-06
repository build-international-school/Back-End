const Admins = require('./admins-model.js');

const db = require('../database/dbConfig.js');

describe('Admins model', function() {

    describe('test environment', function(){
        it('should run in testing', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('add()', function() {
        beforeEach(async () => {
            await db('admins').truncate();
        })
        it('adds user to database', async function(){
            await Admins.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type:'admin'});
            await Admins.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type:'admin'});
            await Admins.add({first_name:'Test3', last_name:'Tester', email:'test3@test.com', password:'Not null', type:'admin'});
            const admins = await db('admins');
            
            expect(admins).toHaveLength(3);
        })
    
    })

    describe('remove()', function() {
        beforeEach(async () => {
            await db('admins').truncate();
        })
        it('removes user by id', async function() {
            // check table empty
            const AdminsEmpty = await db('admins')
            expect(AdminsEmpty).toHaveLength(0);

            await Admins.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type:'admin'});
            await Admins.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type:'admin'});
            const adminsAdded = await db('admins')
            expect(adminsAdded).toHaveLength(2);

            await Admins.remove(1)
            const admins = await db('admins');
            expect(admins).toHaveLength(1);
        })
    })

    describe('findById()', function() {
        beforeEach(async () => {
            await db('admins').truncate();
        })
        it('finds user by id', async function(){
            await Admins.add({first_name:'Test1', last_name:'Tester', email:'test1@test.com', password:'Not null', type:'admin'});
            await Admins.add({first_name:'Test2', last_name:'Tester', email:'test2@test.com', password:'Not null', type:'admin'});
            await Admins.add({first_name:'Test3', last_name:'Tester', email:'test3@test.com', password:'Not null', type:'admin'});

            const admins = await db('admins');
            
            expect(admins).toHaveLength(3);

            const admin = await Admins.findById(3)
            expect(admin).toEqual({ id:3, first_name:'Test3', last_name:'Tester', email:'test3@test.com', organization: null, phone: null, type: 'admin' });
        })
    
    })
})