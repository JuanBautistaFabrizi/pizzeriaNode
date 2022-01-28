const {Schema,model} = require('mongoose');

const CategorySchema = new Schema({
    name: {type: String,required:true},
    status: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    img: {data: Buffer,contentType: String}
})

module.exports = model('Category',CategorySchema);