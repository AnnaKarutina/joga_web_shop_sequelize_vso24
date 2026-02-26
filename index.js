const express = require('express');
const { sequelize } = require('./models/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminProductRoutes = require('./routes/admin/product');
const productRoutes = require('./routes/product');

app.use('/admin/', adminProductRoutes);
app.use('/', productRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((err) => {
    console.error('Unable to synchronize the database:', err);
  });

app.listen(3027, () => {
    console.log(`Server is running on port 3027`);
});