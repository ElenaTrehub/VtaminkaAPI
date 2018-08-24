"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const ProductAttributes = require('./ProductAttributes');
const Product = require('./Product');

const ProductAndAttributes = connection.define('productAndAttributes',{

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
    attributeID:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    attributeValue:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }

},{
    createdAt: false,
    updatedAt: false
});

ProductAndAttributes.belongsTo( Product , { foreignKey: 'productID' } );
ProductAndAttributes.belongsTo( ProductAttributes , { foreignKey: 'attributeID' } );

//ProductAndAttributes.sync({force: true});

module.exports = ProductAndAttributes;