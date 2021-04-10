const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/DBControllers/userController');
const cardController = require('../controllers/DBControllers/cardController');
const messageController = require('../controllers/DBControllers/messageController');

/**
 * unprotected routes
 */
//--------------------login and registration--------------------//
router.post('/usr/register',userController.register);
router.post('/usr/login',userController.login)

//--------------------CRUD for experience cards--------------------//
router.get('/cards/:path/:lang', cardController.read);

//--------------------Messages Controls--------------------//
router.post('/send',messageController.create);


/**
 * protected routes with router.all
 */
router.all('*',(req,res,next)=>{
    passport.authenticate('jwt',{session:false},function (err,user){
        if (err || !user){
            const error = new Error();
            error.status = 401;
            error.message="You are not authorised to get in here";
            return res.send(error);
        }
        req.user = user;
        return next();
    })(req,res,next);
});


//--------------------CRUD for experience cards--------------------//
router.post('/cards', cardController.create);
router.put('/cards/:id', cardController.update);
router.delete ('/cards/:id',cardController.destroy);

//--------------------Messages Controls--------------------//
router.get('/message/get',messageController.read);
router.delete('/message/delete',messageController.destroy);





module.exports = router;
