"use strict";

const Product = require('../../model/defenitions').Product;
const Category = require('../../model/defenitions').Category;
const Response = require('../../model/Response');
const ProductAttributes = require('../../model/defenitions').ProductAttributes;

const ProductAndAttributes = require('../../model/defenitions').ProductAndAttributes;

const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
const ProductImages = require('../../model/defenitions').ProductImages;

const fs = require('fs');

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
    let categories = await Category.findAll();

    res.render('products/new-product' , { attributes: attributes , categories: categories });

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

module.exports.AddNewProduct = async ( req , res )=>{

    let response = new Response();

    try{

        let productTitle = req.body.productTitle;
        let productDescription = req.body.productDescription;
        let productPrice = req.body.productPrice;
        let categories = JSON.parse(req.body.categories);
        let attributes = JSON.parse(req.body.attributes);

        let newProduct = await Product.create({
            'productTitle': productTitle,
            'productDescription': productDescription,
            'productPrice': productPrice,
        });


        for ( let i = 0 ; i < categories.length ; i++ ){

            await ProductAndCategories.create({
                'productID': newProduct.productID,
                'categoryID': categories[i]
            });


        }//for i

        for ( let i = 0 ; i < attributes.length ; i++ ){

            await ProductAndAttributes.create({
                'productID': newProduct.productID,
                'attributeID': attributes[i].attributeID,
                'attributeValue': attributes[i].attributeValue
            });

        }//for i

        //Начало работы с загруженным файлом
        if( req.files ){

           let productImage = req.files.image;
           let path = `public/images/${newProduct.productID}`;

           try{

               fs.mkdirSync(path);

           }//try
           catch(ex){ }

           // fs.existsSync()
           productImage.mv( `${path}/${productImage.name}` ,async function(err) {

                if (err){
                    console.log('FILE UPLOAD ERROR:' , err);
                    return;
                }//if

                await ProductImages.create({
                    'productID': newProduct.productID,
                    'imagePath': `images/${newProduct.productID}/${productImage.name}`
                });

            });

        }//if

        response.code = 200;
        response.message = 'Товар успешно добавлен!';
        response.data = newProduct;

    }//try
    catch(ex){

        console.log(ex);

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        response.data = null;

    }//catch

    res.status(response.code);
    res.send(response);

};

module.exports.GetProductAction = async ( req , res )=>{

    try{

        let product = await Product.findById( req.params.id , {
            include: [
                {
                    model: Category,
                    as: 'categories',
                    //attributes: { exclude: ['categoryTitle'] },
                },
                {
                    model: ProductAttributes
                }
            ]
        });

        if( !product ){
            throw new Error('Product not found!');
        }//if

        product.image = await ProductImages.findOne({
            where: {
                productID: product.productID
            }
        });

        let attributes = await ProductAttributes.findAll();
        let categories = await Category.findAll();

        res.render('products/single-product' , { product: product , attributes: attributes, categories: categories });

    }//try
    catch(ex){
        res.render('error' , { error: ex });
    }//catch

};