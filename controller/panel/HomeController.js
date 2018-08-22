"use strict";

module.exports.HomeAction = ( req , res )=>{

    let title = 'Vtamin-admin';

    res.render('index' , { title: title });

};