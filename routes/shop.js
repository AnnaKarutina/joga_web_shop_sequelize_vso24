const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shop');

router.get('/', ShopController.getAllProducts);
router.get('/cart', ShopController.getCart);
router.post('/cart/add', ShopController.addProductToCart);
router.post('/cart/delete', ShopController.deleteProductFromCart);

module.exports = router;