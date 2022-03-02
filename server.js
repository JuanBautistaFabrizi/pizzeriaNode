const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectDB } = require('./database/config');

const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/categories');
const productRoute = require('./routes/products');

const app = express();

dotenv.config();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});
