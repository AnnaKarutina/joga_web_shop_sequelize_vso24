const express = require('express');
const router = express.Router();
const AdminProductController = require('../../controllers/admin/product');

router.post('/product/add', AdminProductController.addProduct);
router.get('/products', AdminProductController.getAllProducts);
router.get('/products/:id', AdminProductController.getProductById);
router.put('/product/edit/:id', AdminProductController.editProduct);
router.delete('/product/delete/:id', AdminProductController.deleteProduct);

module.exports = router;