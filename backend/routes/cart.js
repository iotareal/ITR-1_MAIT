const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to add book to cart');
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const alreadyInCart = userData.cart.includes(bookid);
        if(alreadyInCart) {
            return res.json({message: "Book already in cart"});
        }
        await User.findByIdAndUpdate(id, {
            $push: {
                cart: bookid
            }
        })
        return res.status(200).json({status: "Success", message: "Book added to cart successfully"});
    }
    catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//delete book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to remove book from cart');
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const alreadyInCart = userData.cart.includes(bookid);
        if(!alreadyInCart) {
            return res.status(400).json({message: "Book not in cart"});
        }
        await User.findByIdAndUpdate(id, {
            $pull: {
                cart: bookid
            }
        })
        return res.status(200).json({status: "Success", message: "Book removed from cart successfully"});
    }
    catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//get cart of a user
router.get("/get-cart", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to get cart');
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartData = userData.cart.reverse();

        return res.status(200).json({status: "Success", data: cartData});
        
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})
module.exports = router