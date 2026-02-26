const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

module.exports = router;