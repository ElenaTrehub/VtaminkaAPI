"use strict";

const Sequelize = require('sequelize');

const connection = require('../routes/connection');

const Category = connection.define('productcategories',{

    categoryID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    categoryTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    }

},{
    createdAt: false,
    updatedAt: false
});

module.exports = Category;