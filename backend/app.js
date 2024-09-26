const express = require("express");
const app = express();

require("dotenv").config();
require("./connection/conn");
const cors = require("cors");
const User = require("./routes/user");
const Book = require("./routes/book");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(cors());
app.use(express.json());
//routes
app.use("/api/v1", User);  
app.use("/api/v1", Book);
app.use("/api/v1", Cart);  
app.use("/api/v1", Order);

//creating port
app.listen(process.env.PORT, ()=> {
    console.log(`Server started at ${process.env.PORT}`);
})