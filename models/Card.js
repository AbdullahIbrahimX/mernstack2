const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
    path: { type:String,required:true},
    lang: {type:String,required:true},
    index: {type:Number,required:true},
    title: { type:String,index:true },
    type: { type:String, required:true},
    createdAt: { type:Date, default:new Date()},
    content: [
        {
            title:{type:String},
            description:{type:String},
            icon: {type:String},
            skill: {type:String},
            level: {type:Number}
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Card = mongoose.model('Card',CardSchema);

module.exports = Card ;
