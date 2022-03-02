const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    img: { type: String, required: true },
    price: { type: Number, default: 0 },
    desc: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'create_at', updatedAt: 'update_at' } });

module.exports = model('Product', ProductSchema);