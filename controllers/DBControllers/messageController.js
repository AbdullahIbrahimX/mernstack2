const Message = require('../../models/Message');

const messageController = {};

messageController.create = async (req,res,next) =>{ //
    const message = req.body;
    const newMessage = new Message({
        ...message
    });

    try{
        const saved = await newMessage.save();
        res.send({
            success:true,
            saved
        })
    }catch (e) {
        next(e)
    }
}

messageController.read = async (req,res,next) => { //

}
messageController.destroy = async (req,res,next) => { //
}


module.exports = messageController
