"use strict";


const Language = require('../../model/defLanguage').Language;

const RegularExpressions = require('../../model/RegularExpressions');

const Response = require('../../model/Response');

module.exports.GetLanguageListAction = async ( req , res )=>{

    try{

        let languages = await Language.findAll();

        res.render('language/language-list',{'languages': languages});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.AddLanguageAction = async ( req , res )=>{

    res.render('language/new-language');

};

module.exports.AddLanguage = async ( req , res )=>{

    let response = new Response();

    try{

        let languageTitle = req.body.languageTitle.trim();

        let languageReduction = req.body.languageReduction.trim();

        if(!languageTitle.match(RegularExpressions.LanguageTitleExpression)){

        response.code = 400;
        response.message = 'Название языка имеет неверный формат!';
        response.data = languageTitle;

        return res.send(response);

    }//if

        if(!languageReduction.match(RegularExpressions.LanguageReductionExpression)){

            response.code = 400;
            response.message = 'Абривиатура языка имеет неверный формат!';
            response.data = languageReduction;

            return res.send(response);

        }//if

        let newLanguage = await Language.create({
            languageTitle: languageTitle,
            languageReduction: languageReduction
        });

        response.code = 200;
        response.message = 'Язык успешно добавлен';
        response.data = newLanguage;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

};