exports.up = function(knex) {
    return knex.schema.createTable('admins', Admins => {
      Admins.increments();
      Admins.string('first_name', 255).notNullable();
      Admins.string('last_name', 255).notNullable();
      Admins.string('email', 255).notNullable().unique();
      Admins.string('phone', 20);
      Admins.string('organization', 255);
      Admins.string('password', 255).notNullable();;
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('admins');
  };