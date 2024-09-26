const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const {authenticateToken} = require("./userAuth");

//add book by admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to add book');
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin") {
            return res.status(400).json({message: "You are not an admin"});
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })

        await book.save();

        return res.status(200).json({message: "book added successfully"});

    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//update book by admin
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to update book');
        const {bookid} = req.headers;  
        console.log(bookid);

        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })
        
        return res.status(200).json({message: "book updated successfully"});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//delete book by admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        console.log('Received request to delete book');
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "book deleted successfully"});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//get all books
router.get("/get-books", async (req, res) => {
    try {
        console.log('Received request to get all books');
        const books = await Book.find().sort({createdAt: -1});
        return res.status(200).json({
            status: "Success",
            data: books
        });
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        console.log('Received request to get book');
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            status: "Success",
            data: book
        });
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;