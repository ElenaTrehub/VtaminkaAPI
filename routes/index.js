"use strict";

const express = require('express');
const router = express.Router();

const HomeController = require('../controller/panel/HomeController');

require('../model/test')('test title');

const CategoryController = require('../controller/panel/CategoryController');
const ProductController = require('../controller/panel/ProductController');

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

/* Products */

router.get('/panel/products' ,ProductController.GetProductsListAction );
router.get('/panel/products/attributes' ,ProductController.GetAttributesAction );

router.get('/panel/products/new' ,ProductController.AddNewProductAction );
router.post('/panel/products/new' ,ProductController.AddNewProduct );

router.get('/panel/products/:id' ,ProductController.GetProductAction );

router.get('/panel/products/attributes/new' ,ProductController.AddNewAttributeAction );
router.post('/panel/products/attributes/new' ,ProductController.AddNewAttribute );

module.exports = router;
