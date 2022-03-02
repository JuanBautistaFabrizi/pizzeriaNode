const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Successfull connection!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    connectDB
}

