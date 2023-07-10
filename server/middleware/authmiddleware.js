// authentication middleware for token decryption:

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (req, res, next)=>{
    try{
        const token = req.header('authorization').split(" ")[1];
        const decodedData = jwt.verify(token , process.env.JWT_SECRET);
        req.body.userId = decodedData.userId;
        next();
    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
}





