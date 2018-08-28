"use strict";

const Sequelize = require('sequelize');

const connection = new Sequelize('vtaminkadb', 'Vtamin-admin', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = connection;
