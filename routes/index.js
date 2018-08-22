"use strict";

const express = require('express');
const router = express.Router();


const HomeController = require('../controller/panel/HomeController');

const CategoryController = require('../controller/panel/CategoryController');

/* GET home page. */
router.get('/', HomeController.HomeAction );
router.get('/panel', HomeController.HomeAction );

/* Categories */
router.get('/panel/categories', CategoryController.GetCategoriesList );
router.get('/panel/category/:id' , CategoryController.GetCategory );


module.exports = router;
