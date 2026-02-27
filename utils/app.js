const { ensureUser } = require('./user');
const { dbSync } = require('./db');


const start = async (app) => {
  try {
    dbSync();
    appUser = await ensureUser();
    console.log('User ensured:', appUser);
    const cart = await appUser.createCart();
    console.log('Cart created for user:', cart);
    app.listen(3027, () => console.log('Server is running on port 3027'));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

module.exports = {
  start,
};