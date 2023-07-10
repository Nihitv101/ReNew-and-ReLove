const router = require('express').Router();
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middleware/authmiddleware.js');



router.post('/register', async(req, res)=>{
    try{
        // check if the user already exists:


        const user = await User.findOne({email:req.body.email});

        if(user){
            throw new Error("User Already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;



        const newUser = await User(req.body);
        await newUser.save();

        return res.send({
            success:true,
            message:"User Successfully Created",
        })

    }
    catch(error){
        return res.send({

            success:false,
            message:error.message,
        })
    }
})


// login


router.post('/login', async (req, res)=>{
    try{


        // check if user does not exist:
        const user = await User.findOne({email:req.body.email});

        if(!user){
            // user does notexits:
            throw new Error("User doest not exits");
        }


        // check user is active or not:
        if(user.status !== "active"){
            throw new Error('User account is blocked, Please conteact the admin')
        }



        // compare password:
        const isMatched = await bcrypt.compare(req.body.password, user?.password);

        if(!isMatched){
            throw new Error("Invalid Password");
        }


        // generate and return json web token with some payload userId;

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET , {
            expiresIn:'1d'
        });


        return res.send({
            success:true,
            message:"User logged in Sucessfully",
            data:token,
        })


    }
    catch(error){
        res.send({
            success:false,
            message:error.message,
        })
    }
})



// get current user:
router.get('/get-current-user', authmiddleware, async(req, res)=>{
    try{
        const user = await User.findById(req.body.userId);
        
        return res.send({
            success:true,
            message:"User fetched Successfully",
            data:user,
        })

    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})

// get all users:
router.get('/get-users', authmiddleware,async(req, res)=>{
    try{
        const users = await User.find();
        return res.send({
            success:true,
            message:"Users fetched Successfully",
            data:users,
        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})


// update user status:
router.put('/update-user-status/:id', authmiddleware, async(req, res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success:true,
            message:"User status Updated Successfully",
        })
        

    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})


module.exports = router;
