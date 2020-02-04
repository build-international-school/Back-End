const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('admins').truncate()
    .then(function () {
      return knex('admins').insert([
        {
          id: 1,
          first_name: 'Testy',
          last_name: 'McTesterson',
          email: 'test@test.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '555-555-1234',
          organization: 'International School'
      },
      {
          id: 2,
          first_name: 'Brittani',
          last_name: 'Luce',
          email: 'c0der.br1t@gmail.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '913-701-4016',
          organization: 'Lambda School'
      },
      {
          id: 3,
          first_name: 'Brittani',
          last_name: 'Divine',
          email: 'xynova.333@gmail.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '913-701-4016',
          organization: 'Lambda School'
      }
      ]);
    });
};