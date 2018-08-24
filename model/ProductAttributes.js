"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const ProductAttributes = connection.define('productAttributes',{

    attributeID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    attributeTitle: {
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

//ProductAttributes.sync({force: true});

module.exports = ProductAttributes;