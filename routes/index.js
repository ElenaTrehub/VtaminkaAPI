"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');


const CategoryController = require('../controller/panel/CategoryController');

/* GET home page. */
router.get('/', HomeController.HomeAction );
router.get('/panel', HomeController.HomeAction );

/* Categories */
router.get('/panel/categories', CategoryController.GetCategoriesListAction );
router.get('/panel/category/new' , CategoryController.AddCategoryAction);
router.get('/panel/category/:id' , CategoryController.GetCategoryAction );
router.post('/panel/category/new' , CategoryController.AddCategory);
router.put('/panel/category/:id' , CategoryController.UpdateCategory );
router.delete('/panel/category' , CategoryController.RemoveCategory );

module.exports = router;
