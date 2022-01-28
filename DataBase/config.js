const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection succesfull!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    main
}

