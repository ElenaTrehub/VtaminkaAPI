"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const ProductAndCategories = require('./ProductAndCategories');
const Product = require('./Product');

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
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    }

},{
    createdAt: false,
    updatedAt: false
});

//Category.sync({force: true});

module.exports = Category;