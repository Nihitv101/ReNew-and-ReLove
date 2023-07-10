const router = require('express').Router();
const authmiddleware = require('../middleware/authmiddleware.js');
const Bid = require('../models/bid.model.js');


// Place a new bid:
router.post('/place-new-bid',authmiddleware,async(req, res)=>{
    try{
        // create new bid:
        const newBid = new Bid(req.body);
        await newBid.save();

        return res.send({
            success:true,
            message:"Bid Places Susccessfully",
        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})


// get all bids:
router.post('/get-all-bids',authmiddleware, async(req,res)=>{
    try{

        const {product, seller, buyer} = req.body;


        let filters = {}

        if(product){
            filters.product = product;
        }
        if(seller){
            filters.seller = seller;
        }

        if(buyer){
           filters.buyer = buyer; 
        }

        const bids = await Bid.find(filters)
        .populate('product')
        .populate('buyer')
        .populate('seller')
        .sort({createdAt:-1})
        

        return res.send({
            success:true,
            data:bids,
        });



    }
    catch(error){
       return res.send({
            success:false,
            message:error.message,
        })
    }
})


module.exports = router;
