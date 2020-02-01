const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
};

function add(user) {
    return db("students")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}
function find() {
    return db("students").select("*");
}

function findBy(filter) {
    return db("students")
        .select("*")
        .where(filter);
}

function findById(id) {
    return db("students")
        .select("*")
        .where({ id })
        .first();
}

function update(changes, id) {
    return db('students')
      .where({ id })
      .update(changes)
      .select("id", "first_name", "last_name", "email", "phone", "organization");
  }

function remove(id) {
    return db('students')
      .where('id', id)
      .del();
  }