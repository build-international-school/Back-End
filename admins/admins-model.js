const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db("users").select("id", "username", "type");
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password", "type")
        .where(filter);
}

function add(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
      .where('id', id)
      .del();
  }
