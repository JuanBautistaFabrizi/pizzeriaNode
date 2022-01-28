const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String,required:true},
    status: {type:Boolean,required:true},
    email: {type:String,required:true}
})

module.exports = model('User',UserSchema);