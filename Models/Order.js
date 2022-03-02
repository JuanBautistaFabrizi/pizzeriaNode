const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    number: { type: Number, unique: true },
    price: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],
    // amount: { type: Number, required: true },
    // address: { type: Object, required: true },
    // status: { type: String, default: 'pending' }
});

module.exports = model('Order', OrderSchema);
