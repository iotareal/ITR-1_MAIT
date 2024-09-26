const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const {authenticateToken} = require("./userAuth");


//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to place order');
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id
            })
            const savedOrder = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: {
                    orders: savedOrder._id
                }
            })

            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: {
                    cart: orderData._id
                }
            })
        }
        return res.status(200).json({status: "Success", message: "Order placed successfully"});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//get order history of a particular order
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to get order history');
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {
                path: "book"
            }
        });
        const orderData = userData.orders.reverse();
        console.log(orderData);
        return res.status(200).json({
            status: "Success",
            data: orderData
        });
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})
     
//get order history of all orders (admin)
router.get("/get-all-order-history", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to get all order history');
        const orders = await Order.find()
        .populate({
            path: "book"
        })
        .populate({
            path: "user"
        })
        .sort({createdAt: -1});
        return res.status(200).json({
            status: "Success",
            data: orders
        });
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})
module.exports = router