const express = require('express');
const { connect } = require('./utils/db');

const app = express();
app.use(express.json());

connect();

app.listen(3027, () => {
    console.log(`Server is running on port 3027`);
});