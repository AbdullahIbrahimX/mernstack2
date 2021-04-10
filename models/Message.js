const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    email:{type:String, required:true},
    message:{type:String, required:true},
    name:{type:String},
    read:{type: Boolean},
    date:{type:Date , default:new Date, required:true}
});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;
