
exports.up = function(knex) {
    return knex.schema
        .createTable('students', tbl => {
            tbl.increments();
            tbl.string('first_name',255).notNullable().index();
            tbl.string('last_name',255).notNullable();
            tbl.string('grade', 255);
            tbl.text('address');
            tbl.string('img_url', 1024);
            tbl.text('background');
            tbl.string('status', 255);
            tbl.integer('age');
            tbl.boolean('insurance').defaultTo(false);
            tbl.string('exp_date');
            tbl.boolean('birth_certificate').defaultTo(false);
            tbl.text('special_needs');
            tbl.string('representative_name', 255);
            tbl.string('representative_contact', 255);
            tbl.integer('admin_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('admins')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('students')
};
