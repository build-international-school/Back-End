
exports.seed = function(knex) {
  return knex('students').truncate()
    .then(function () {
      return knex('students').insert([
        {
          id: 1,
          first_name: 'Mandi',
          last_name: 'Haase',
          grade: '3',
          address: '111 Ever St., Alexandria, VA 00000',
          img_url: '',
          background: 'I have been learning programming for 2 months',
          status: 'active',
          age: '10',
          insurance: false,
          exp_date: '',
          birth_certificate: true,
          special_needs: 'no',
          representative_name: 'father',
          representative_contact: '1231231234',
          admin_id: 1
      },
      {
          id: 2,
          first_name: 'Jon',
          last_name: 'Haase',
          grade: '4',
          address: '222 Ever St., Alexandria, VA 00000',
          img_url: '',
          background: 'I have been learning programming for 3 months',
          status: 'active',
          age: '11',
          insurance: false,
          exp_date: '',
          birth_certificate: true,
          special_needs: 'no',
          representative_name: 'mother',
          representative_contact: '1231231234',
          admin_id: 2
      },
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
      },
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
      },
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
      ]);
    });
};