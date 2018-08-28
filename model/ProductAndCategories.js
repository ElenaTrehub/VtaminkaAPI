"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

//const Category = require('./Category');

const Product = require('./Product');

const ProductAndCategories = connection.define('productAndCategories',{

    ID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    productID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    categoryID:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }

},{
    createdAt: false,
    updatedAt: false
});

//Category.belongsToMany(Product , { through: ProductAndCategories });

//ProductAndCategories.sync({force: true});

module.exports = ProductAndCategories;