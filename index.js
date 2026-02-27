const express = require('express');

const { sequelize } = require('./utils/db');
const  { models } = require('./models/index');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const { ensureUser } = require('./utils/user');
const { start } = require('./utils/app');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async(req, res, next) => {
    try {
        req.user = await ensureUser();
        console.log('User attached to request:', req.user);
        next();
    } catch (error) {
        console.error('Error in user middleware:', error);
        res.status(500).json({ error: 'An error occurred while processing the user.' });
    }
});

const adminProductRoutes = require('./routes/admin/product');
const productRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');

app.use('/admin/', adminProductRoutes);
app.use('/', productRoutes);
app.use('/', shopRoutes);

User.hasMany(Product, { 
    foreignKey: 'userId', as: 'products' 
});
Product.belongsTo(User, { 
    foreignKey: 'userId', as: 'user' 
}, {
    constrains: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
User.hasOne(Cart, {
    foreignKey: 'userId'
});
Cart.belongsTo(User, {
    foreignKey: 'userId'
});
Cart.belongsToMany(Product, {
    through: CartItem,
    foreignKey: 'cartId',
    otherKey: 'productId'
});
Product.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: 'productId',
    otherKey: 'cartId'
});


start(app);