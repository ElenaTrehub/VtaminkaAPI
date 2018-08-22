"use strict";

const Category = require('../../model/Category');

module.exports.GetCategoriesList = async ( req , res )=>{

    try{

        let categories = await Category.findAll();

        res.render('categories/categories-list',{'categories': categories});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};


module.exports.GetCategory = async ( req , res )=>{

    try{

        let categoryID = +req.params.id;

        let category = await Category.findById( categoryID );

        res.render('categories/single-category',{'category': category});

    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};