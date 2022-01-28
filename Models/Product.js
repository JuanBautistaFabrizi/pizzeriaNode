const {Schema,model} = require('mongoose');

const ProductSchema = new Schema({
    name: {type: String,required:true},
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    img: {data: Buffer,contentType: String},
    price: { type: Number, default: 0 },
    desc: { type: String }
})

module.exports = model('Product',ProductSchema);