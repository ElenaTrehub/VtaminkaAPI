"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const Category = require('./Category');

const Product = connection.define('products',{

    productID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    productTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductTitleExpression
        }

    },
    productDescription:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductDescriptionExpression,
        }
    },
    productPrice:{
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    //categories: Sequelize.DataTypes.VIRTUAL

},{
    createdAt: 'created',
    updatedAt: 'updated'
});

//Product.sync({force: true});

//Product.hasMany(this.Category);

module.exports = Product;