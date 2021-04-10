const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const userController = {};

userController.register = async (req,res,next) => {
    const {name,password,email,joined} = req.body;
    const newUser = new User({
        name,
        password,
        email,
        joined
    });

    try{
        const response = await newUser.save();
        return res.send({ response })
    }catch (e){
        if (e.code === 11000 && e.name === 'MongoError'){
            let error = new Error(`The email address ${newUser.email} is already exist`);
            next(error);
        }else{
            next(e)
        }
    }
} // register new user

userController.login = async (req,res,next)=>{
    //get username and password from request
    const { email, password } = req.body;
    //check username and password are OK
    try{
        const user = await User.findOne({ email })

        if(!user) {// TODO I might delete this to make the system more secure
            const error = new Error("Email not found");
            error.status = 401;
            next(error)
        }
        //if credential are OK create JWT and return it
        user.isPasswordMatch(password,user.password,(err,match)=>{
            if ( match ){
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;

                const token = jwt.sign({ _id : user._id }, secret,{expiresIn:expire});
                return res.send({token});
            }

            res.status(401).send({
                error:'invalid password or email'
            })
        })


    }catch (e){
        next(e)
    }

}


module.exports = userController
