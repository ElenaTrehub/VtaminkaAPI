"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

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
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    }

},{
    createdAt: false,
    updatedAt: false
});

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
        type: Sequelize.DataTypes.STRING(1500),
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductDescriptionExpression,
        }
    },
    productPrice:{
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    image: Sequelize.DataTypes.VIRTUAL

},{
    createdAt: 'created',
    updatedAt: 'updated'
});

const ProductAndCategories = connection.define('pCategories',{

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

const ProductAttributes = connection.define('attributes',{

    attributeID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    attributeTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    },
    attributeValue: {
        type:Sequelize.DataTypes.VIRTUAL
    }

},{
    createdAt: false,
    updatedAt: false
});

const ProductAndAttributes = connection.define('pAttributes',{

    ID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    attributeValue:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }

},{
    createdAt: false,
    updatedAt: false
});

const ProductImages = connection.define('pImages', {
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

Product.belongsToMany( Category , { through: ProductAndCategories , foreignKey: 'productID' , as: 'categories' });
Category.belongsToMany( Product ,  { through: ProductAndCategories , foreignKey: 'categoryID'});

Product.belongsToMany( ProductAttributes , { through: ProductAndAttributes , foreignKey: 'productID'});
ProductAttributes.belongsToMany( Product , { through: ProductAndAttributes , foreignKey:'attributeID'});

ProductImages.belongsTo(Product , { foreignKey: 'productID' });

//
// Product.sync({force: true});
// Category.sync({force: true});
// ProductAndCategories.sync({force: true});
// ProductAttributes.sync({force: true});
// ProductAndAttributes.sync({force: true});
// ProductImages.sync({force: true});

module.exports.Category = Category;
module.exports.Product = Product;
module.exports.ProductAndCategories = ProductAndCategories;

module.exports.ProductAttributes = ProductAttributes;
module.exports.ProductAndAttributes = ProductAndAttributes;
module.exports.ProductImages = ProductImages;


