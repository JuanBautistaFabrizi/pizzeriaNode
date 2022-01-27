const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const {main} = require('./DataBase/config')

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
main();

app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`);
})
