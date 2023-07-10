const router = require('express').Router();
const authmiddleware = require('../middleware/authmiddleware.js');
const Product = require('../models/product.model.js');
const User = require('../models/user.model.js');
const Notification = require('../models/notification.model.js');


const cloudinary = require('../config/cloudinaryConfig.js');
const multer = require('multer');




// Add a new Product:
router.post('/add-product', authmiddleware, async(req, res)=>{
    try{

        const newProduct = await Product(req.body);
        await newProduct.save();

        // When the product is added send notification to admin:


       const admins = await User.find({ role: "admin" });
       admins.forEach(async (admin) => {
         const newNotification = new Notification({
           user: admin._id,
           message: `New product added by ${req.user.name}`,
           title: "New Product",
           onClick: `/admin`,
           read: false,
         });
         await newNotification.save();
       });
   



        return res.send({
            success:true,
            message:"Product Added Successfully",
        })

    }
    catch(error){
        return res.send({
            okay:"ok",
            success:false,
            message:error.message,
        })
    }
})

// get all products;
router.post('/get-products', async(req, res)=>{
    try{

        console.log(req.body);



        const {seller,category=[],age=[], status} = req.body;
        
        let filters={};

        if(seller){
            filters.seller = seller;
        }

        if(status){
            filters.status = status;
        }

        // filter by category:

        if(category.length > 0){
            filters.category = {$in: category};
        }

         // filter by age
    if (age.length > 0) {
        age.forEach((item) => {
          const fromAge = item.split("-")[0];
          const toAge = item.split("-")[1];
          filters.age = { $gte: fromAge, $lte: toAge };
        });
      }
  



        const products = await Product.find(filters).sort({createdAt:-1}).populate('seller')
        return res.send({
            success:true,
            data:products,
            message:"Products fetched",
            body:req.body,

        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})

// edit Product:
router.put('/edit-product/:id', authmiddleware, async(req, res)=>{
    try{
        await Product.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success:true,
            message:"Product Uploaded Successfully",
        })


    }
    catch(error){
        return res.send({
            error:'error',
            success:false,
            message:error.message,
        })
    }
})


// delete product:
router.delete('/delete-product/:id', authmiddleware, async(req, res)=>{

    try{
        await Product.findByIdAndDelete(req.params.id);
        return res.send({
            success:true,
            message:"Product Deleted Successfully",
        });
    }
    catch(error){
        return res.send({
            error:'error',
            success:false,
            message:error.message,
        })
    }
})


// Handle Image upload to cloudinary:
// multer is able to get the storage from our system
// multer is handleing the image from our system to cloudinary;


// get image from pc
const storage = multer.diskStorage({
    filename:function (req, file, callback){
        callback(null, Date.now() + file.originalname);
    },
});



router.post('/upload-image-to-product', authmiddleware, multer({storage:storage}).single('file'), async(req, res)=>{

    try{
        // upload image to cloudinary:
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder:'marketplace',
        });



        const productId = req.body.productId;

        await Product.findByIdAndUpdate(productId, {
            $push: {images: result.secure_url}, // image url
        });




        return res.send({
            success:true,
            message:"Image uploaded Successfully",
            data:result.secure_url,
        })

    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
          });
    }

})



// Update Product Status:

router.put('/update-product-status/:id', authmiddleware, async(req, res)=>{
    try{
        const {status} = req.body;
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {status});


        // Send Notification to user:
        const newNotification = new Notification({
            user:updateProduct.seller,
            message:`Your Product ${updateProduct.name} has been ${status}`,
            title:"Product Status Updated",
            onClick:'/profile',
            read:false,
        })

        await newNotification.save();


        return res.send({
            success:true,
            message:"Product Status updated Successfully",
        })
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})



// get product by id:


router.get('/get-product-by-id/:id', async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('seller');
        return res.send({
            success:true,
            data:product,
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
