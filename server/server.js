const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbconfig = require('./config/dbconfig.js');

const PORT = process.env.PORT || 5000;



const usersRoute = require('./routes/user.route.js');
const productRoute = require('./routes/product.route.js');
const bidRoute = require('./routes/bids.route.js');
const notificationRoute = require('./routes/notification.route.js');



app.use('/api/users', usersRoute);
app.use('/api/products',productRoute);
app.use('/api/bids', bidRoute);
app.use('/api/notifications', notificationRoute);



// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}




app.listen(PORT, ()=>{
    console.log(`server is on http://localhost:${PORT}`);
})

