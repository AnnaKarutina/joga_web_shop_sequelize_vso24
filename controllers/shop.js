const Product = require('../models/product');
const CartItem = require('../models/cart-item');


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
};

const getCart = async (req, res) => {
  try {
    const userCart = await req.user.getCart();
    console.log('User cart:', userCart);
    if (userCart) {
        const cartProducts = await userCart.getProducts();
        console.log('Products in cart:', cartProducts);
      res.status(200).json({ products: cartProducts });
    } else {
      res.status(404).json({ error: 'Cart not found.' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'An error occurred while fetching the cart.' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);
    const userCart = await req.user.getCart();
    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found for the user.' });
    }
    const products = await userCart.getProducts();
    if (products.length == 0) {
        const product = await Product.findByPk(productId);
        await userCart.addProduct(product, { through: { quantity: 1} });
    } else {
        if(await userCart.hasProduct(productId)) {
            const cartItem = await CartItem.findOne({
                where: {
                    cartId: userCart.id,
                    productId: productId
                }
            });
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            const product = await Product.findByPk(productId);
            await userCart.addProduct(product, { through: { quantity: 1} });
        }
    }
    res.status(200).json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
  }
}

const deleteProductFromCart = async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);
    const userCart = await req.user.getCart();
    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found for the user.' });
    }
    const products = await userCart.getProducts();
    if (products.length == 0) {
        return res.status(404).json({ error: 'No products in cart to delete.' });
    } else {
        if(await userCart.hasProduct(productId)) {
            const cartItem = await CartItem.findOne({
                where: {
                    cartId: userCart.id,
                    productId: productId
                }
            });
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
            } else {
                await userCart.removeProduct(productId);
            }
        } else {
            return res.status(404).json({ error: 'Product not found in cart.' });
        }
    }
    res.status(200).json({ message: 'Product removed from cart successfully.' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'An error occurred while removing the product from the cart.' });
  }
}


module.exports = {
  getAllProducts,
  getCart,
  addProductToCart,
  deleteProductFromCart
};