const express = require('express');
const { sequelize } = require('./utils/db');
const  { models } = require('./models/index');
const Product = require('./models/product');
const User = require('./models/user');
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

app.use('/admin/', adminProductRoutes);
app.use('/', productRoutes);

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

start(app);