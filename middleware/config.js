const express = require("express");
const session = require('express-session');
const KnexSessionStore = require("connect-session-knex")(session);
const helmet = require("helmet");
const cors = require("cors");
const fileupload = require('express-fileupload');

const logger = require('./logger.js');

const sessionConfig = {
    name: "Lambda Feb 2020 Buildweek",
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "Secrets don't make friends...",
    cookie: {
        httpOnly: true,
        maxAge: 600000,
        secure: false, //Don't forget to change to true for production!
    },
    store: new KnexSessionStore({
        knex: require("../database/dbConfig.js"),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 600000,
    }),
};

module.exports = function(server) {
    server.use(logger);
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(fileupload({ useTempFiles: true }));
    server.use(session(sessionConfig));
};