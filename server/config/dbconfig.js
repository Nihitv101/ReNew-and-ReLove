// mongo db connection:

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log("Mongo db connected");
});


connection.on('error',(err)=>{
    console.log('Mongo db Connection error');
})


module.exports = connection;
