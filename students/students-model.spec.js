const Students = require('./students-model.js');

const db = require('../database/dbConfig.js');

describe('Students model', function() {

    describe('test environment', function(){
        it('should run in testing', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('add()', function() {
        beforeEach(async () => {
            await db('students').truncate();
        })
        it('adds user to database', async function(){
            await Students.add(
                {
                    id: 3,
                    first_name: 'Alex',
                    last_name: 'Smith',
                    grade: '4',
                    address: '333 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 4 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 2
                }
            );
            await Students.add(
                {
                    id: 4,
                    first_name: 'Amber',
                    last_name: 'Smith',
                    grade: '4',
                    address: '444 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 2 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 3
                }
            );
            await Students.add(
                {
                    id: 5,
                    first_name: 'Amy',
                    last_name: 'Smith',
                    grade: '4',
                    address: '555 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 3 months',
                    status: 'active',
                    age: '12',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 3
                }
            );
            const students = await db('students');
            
            expect(students).toHaveLength(3);
        })
    
    })

    describe('remove()', function() {
        beforeEach(async () => {
            await db('students').truncate();
        })
        it('removes user by id', async function() {
            // check table empty
            const studentsEmpty = await db('students')
            expect(studentsEmpty).toHaveLength(0);

            await Students.add(
                {
                    id: 3,
                    first_name: 'Alex',
                    last_name: 'Smith',
                    grade: '4',
                    address: '333 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 4 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 2
                }
            );
            await Students.add(
                {
                    id: 4,
                    first_name: 'Amber',
                    last_name: 'Smith',
                    grade: '4',
                    address: '444 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 2 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 3
                }
            );
            const studentsAdded = await db('students')
            expect(studentsAdded).toHaveLength(2);

            await Students.remove(4)
            const students = await db('students');
            expect(students).toHaveLength(1);
        })
    })

    describe('findById()', function() {
        beforeEach(async () => {
            await db('students').truncate();
        })
        it('finds user by id', async function(){
            await Students.add(
                {
                    id: 3,
                    first_name: 'Alex',
                    last_name: 'Smith',
                    grade: '4',
                    address: '333 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 4 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 2
                }
            );
            await Students.add(
                {
                    id: 4,
                    first_name: 'Amber',
                    last_name: 'Smith',
                    grade: '4',
                    address: '444 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 2 months',
                    status: 'active',
                    age: '11',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 3
                }
            );
            await Students.add(
                {
                    id: 5,
                    first_name: 'Amy',
                    last_name: 'Smith',
                    grade: '4',
                    address: '555 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 3 months',
                    status: 'active',
                    age: '12',
                    insurance: false,
                    exp_date: '',
                    birth_certificate: true,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 3
                }
            );
            const students = await db('students');
            
            expect(students).toHaveLength(3);

            const student = await Students.findById(3)
            expect(student).toEqual(
                {
                    id: 3,
                    first_name: 'Alex',
                    last_name: 'Smith',
                    grade: '4',
                    address: '333 Ever St., Alexandria, VA 00000',
                    img_url: '',
                    background: 'I have been learning programming for 4 months',
                    status: 'active',
                    age: 11,
                    insurance: 0,
                    exp_date: '',
                    birth_certificate: 1,
                    special_needs: 'no',
                    representative_name: 'mother',
                    representative_contact: '1231231234',
                    admin_id: 2
                }
            );
        })
    
    })
})