const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('workers').truncate()
    .then(function () {
      return knex('workers').insert([
        {
          id: 1,
          first_name: 'Robert',
          last_name: 'Gordon',
          email: 'robert@test.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '555-555-1234',
          organization: 'Lambda School',
          type: 'worker'
      },
      {
          id: 2,
          first_name: 'Brittney',
          last_name: 'Spears',
          email: 'brittney@test.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '900-107-1640',
          organization: 'Mouseketeers',
          type: 'worker'
      },
      {
          id: 3,
          first_name: 'Rick',
          last_name: 'Astley',
          email: 'rick@roll.com',
          password: bcrypt.hashSync('testtest', 10),
          phone: '800-888-6789',
          organization: 'Never Gonna Give You Up',
          type: 'worker'
      }
      ]);
    });
};