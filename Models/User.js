const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String,required:true},
    status: {type:Boolean,required:true},
    role: { type: String, required: true, enum: ['ADMIN_ROLE', 'CLIENT_ROLE'] },
    email: {type:String,required:true}
})

module.exports = model('User',UserSchema);