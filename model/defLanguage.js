"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const Language = connection.define('languagies',{

    languageID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    languageTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    },
    languageReduction: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,

    }

},{
    createdAt: 'created',
    updatedAt: 'updated'
});

const ConstLinks = connection.define('constLinks',{

    constLinkID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    constLinkReduction: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,

    },
    constLinkTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductTitleExpression
        }

    }

},{
    createdAt: 'created',
    updatedAt: 'updated'
});

const TranslateValues = connection.define('translateValues',{

    ID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    }

},{
    createdAt: false,
    updatedAt: false
});



Language.belongsToMany( ConstLinks , { through: TranslateValues , foreignKey: 'languageID' , as: 'constLinks' });
ConstLinks.belongsToMany( Language ,  { through: TranslateValues , foreignKey: 'constLinkID'});




//Language.sync({force: true});
 //ConstLinks.sync({force: true});
TranslateValues.sync({force: true});

module.exports.Language = Language;
module.exports.ConstLinks = ConstLinks;
module.exports.TranslateValues = TranslateValues;
