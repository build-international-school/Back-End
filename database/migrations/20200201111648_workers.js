
exports.up = function(knex) {
    return knex.schema.createTable('workers', Workers => {
      Workers.increments();
      Workers.string('first_name', 255).notNullable();
      Workers.string('last_name', 255).notNullable();
      Workers.string('email', 255).notNullable().unique();
      Workers.string('phone', 20);
      Workers.string('organization', 255);
      Workers.string('password', 255).notNullable();;
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('workers');
  };