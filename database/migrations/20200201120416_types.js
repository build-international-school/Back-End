
exports.up = function(knex) {
    return knex.schema
        .table('admins', tbl => {
            tbl.string('type', 80)
        })
        .table('workers', tbl => {
            tbl.string('type', 80)
        })
  
};

exports.down = function(knex) {
    return knex.schema
        .table('workers', tbl => {
            tbl.dropColumn('type')
        })
        .table('admins', tbl => {
            tbl.dropColumn('type')
        })
};