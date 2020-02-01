const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db("admins").select("id", "first_name", "last_name", "email", "phone", "organization");
}

function findBy(filter) {
    return db("admins")
        .select("id", "first_name", "last_name", "email", "phone", "organization", "password")
        .where(filter);
}

function add(user) {
    return db("admins")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db("admins")
        .select("id", "first_name", "last_name", "email", "phone", "organization")
        .where({ id })
        .first();
}

function remove(id) {
    return db('admins')
      .where('id', id)
      .del();
  }
