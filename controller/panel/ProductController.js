"use strict";


const Product = require('../../model/Product');
const Response = require('../../model/Response');
const ProductAttributes = require('../../model/ProductAttributes');
const ProductAndAttributes = require('../../model/ProductAndAttributes');

const RegularExpressions = require('../../model/RegularExpressions');

module.exports.GetProductsListAction = async ( req , res )=>{

    try{

        let products = await Product.findAll({
            limit: 10,
            offset: 0
        });

        res.render('products/products-list' , { 'products': products });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.AddNewProductAction = async (req , res)=>{

    let attributes = await ProductAttributes.findAll();

    res.render('products/new-product' , { attributes: attributes });

};

module.exports.GetAttributesAction = async (req , res  )=>{

    try{

        let attributes = await ProductAttributes.findAll({
            limit: 10,
            offset: 0,
            order: [
                ['attributeID' , 'DESC']
            ]
        });

        res.render('products/attributes/attributes-list' , { 'attributes': attributes });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.AddNewAttributeAction = async (req , res)=>{

    res.render('products/attributes/new-attribute');

};

module.exports.AddNewAttribute = async ( req , res )=>{

    let response = new Response();

    try{

        let attributeTitle = req.body.attributeTitle.trim();

        if(!attributeTitle.match(RegularExpressions.CategoryTitleExpression)){

            response.code = 400;
            response.message = 'Название атрибута имеет неверный формат!';
            response.data = attributeTitle;

            return res.send(response);

        }//if

        let newAttribute = await ProductAttributes.create({
            attributeTitle: attributeTitle
        });

        response.code = 200;
        response.message = 'Атрибут успешно добавлен';
        response.data = newAttribute;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch
};