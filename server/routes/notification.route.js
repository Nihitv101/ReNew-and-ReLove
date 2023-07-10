const router = require('express').Router();
const authmiddleware = require('../middleware/authmiddleware.js');
const Notification = require('../models/notification.model.js');

// Add A Notification
router.post('/notify', authmiddleware, async(req, res)=>{
    try{
        const notification = new Notification(req.body)
        await notification.save();

        return res.send({
            success:true,
            message:"Notification Added Successfully"
        })
        
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})



// get all notification by user id:
router.get('/get-all-notifications', authmiddleware, async(req, res)=>{
    try{
        const notification = await Notification.find({
            user:req.body.userId,
        }).sort({createdAt:-1});

        return res.send({
            success:true,
            data:notification,
        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})


// delete notification:
router.delete('/delete-notification/:id', authmiddleware, async(req, res)=>{
    try{
        await Notification.findByIdAndDelete(req.params.id);
        return res.send({
            success:true,
            message:"Notification Deleted Successfully"
        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})


// read all notification by user: update norification read
router.put('/read-all-notifications', authmiddleware , async(req,res)=>{
    try{

        await Notification.updateMany( 
            {user:req.body.userId, read:false},
            {$set: {read:true}}
        );
        

        res.send({
            success: true,
            message: "All notifications marked as read",
          });


    }catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})

module.exports = router;
