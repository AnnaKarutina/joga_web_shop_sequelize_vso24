const express = require('express');
const models = require('./utils/models');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminProductRoutes = require('./routes/admin/product');
const productRoutes = require('./routes/product');

app.use('/admin/', adminProductRoutes);
app.use('/', productRoutes);

app.listen(3027, () => {
    console.log(`Server is running on port 3027`);
});