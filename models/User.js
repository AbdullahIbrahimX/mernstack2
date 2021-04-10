const mongoose = require('mongoose');
const encrypt = require('bcrypt')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type:String },
    email: { type:String, required:true, unique:true, index:true},
    password: { type:String, required:true},
    joined: { type:Date, default:new Date()}
});


UserSchema.pre('save', async function (next) {//Hash the password before storing
    if (!this.isModified('password')){
        return next();
    }

    try{
        const salt = await encrypt.genSalt(10);
        this.password = await encrypt.hash(this.password, salt)
        next();
    }catch (e){
        return next(e);
    }
});

UserSchema.methods.isPasswordMatch = function ( password, hashed, callback ){//Password check
    encrypt.compare(password, hashed, (err, success)=>{
            if (err){
                return callback(err);
            }
            return callback(null,success)
        }
    )
}

UserSchema.methods.toJSON = function (){//override toJSON method to return no password
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}


const User = mongoose.model('User',UserSchema);

module.exports = User ;
