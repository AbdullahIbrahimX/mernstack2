const Card = require('../../models/Card');

const cardController = {};

cardController.create = async (req,res,next) =>{
    const card = req.body;
    const newCard = new Card({
        ...card,
        owner: req.user
    });

    try{
        const saved = await newCard.save();
        return res.send({
            success:true,
            card:saved
        })
    }catch (e) {
        next(e);
    }
}
/**
 * @returns { success:true +- extra} when promise is fulfilled
 */
cardController.read = async (req,res,next) =>{ //GET"/api/v1/card/:path = ["WorkExperiance,ProfissionalExperiance,Education]"
    // const { user } = req
    // const query = {
    //     owner: user._id
    // }
    // try {
    //     const cards =await Card.find(query);
    //     return res.send({
    //         cards
    //     });
    // }catch (e) {
    //     next(e);
    // }

    const path = req.params.path;
    const lang = req.params.lang;
    const query = { path,lang }

    try{
        const cards = await Card.find(query);

        return res.send({
            success:true,
            cards:[...cards]
        });
    }catch (e){
        next(e);
    }
}
cardController.readAll = (req,res,next) =>{}
cardController.update = async (req,res,next) =>{//PUT"/api/v1/card/:id"
    const _id = req.params.id;
    const update = req.body;

    const query = { _id }

    try{
        const card = await Card.updateOne(query,update);
        res.send({
            success:true,
            card
        });
    }catch (e) {
        next(e);
    }
}
cardController.destroy = async (req,res,next) =>{//DELETE"/api/v1/card"
    const _id = req.params.id;
    const query = { _id };

    try{
        await Card.deleteOne(query)
        res.send({
            success:true
        });
    }catch (e){
        next(e);
    }
}

module.exports = cardController
