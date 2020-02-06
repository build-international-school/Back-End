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
    return db("workers")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}
function find() {
    return db("workers").select("id", "first_name", "last_name", "email", "phone", "organization", "type");
}

function findBy(filter) {
    return db("workers")
        .select("id", "first_name", "last_name", "email", "phone", "organization", "password", "type")
        .where(filter);
}

function findById(id) {
    return db("workers")
        .select("id", "first_name", "last_name", "email", "phone", "organization", "type")
        .where({ id })
        .first();
}

function update(changes, id) {
    return db('workers')
      .where({ id })
      .update(changes)
      .select("id", "first_name", "last_name", "email", "phone", "organization");
  }

function remove(id) {
    return db('workers')
      .where('id', id)
      .del();
  }