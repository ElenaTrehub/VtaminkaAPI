"use strict";

const Sequelize = require('sequelize');
const Product = require('./Product');

const connection = require('../routes/connection');

const ProductImages = connection.define('productImages', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    productID: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    imagePath:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING(1500),
        validate:{
            min: 2,
            max: 1500
        }
    }
});

//ProductImages.belongsTo(Product , { foreignKey: 'productID' });

//ProductImages.sync({force: true});

module.exports = ProductImages;
