const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const {username, email, password, address} = req.body;
        //check username length > 4
        if(username.length <= 4) {
            return res.status(400).json({message: "username length should be more than 4"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //check if username already exists
        const existingUsername = await User.findOne({username: username})
        if(existingUsername) {
            return res.status(400).json({message: "Username already exists"})
        }
        
        //check if email already exists
        const existingEmail = await User.findOne({email: email})
        if(existingEmail) {
            return res.status(400).json({message: "Eamil already exists"})
        }

        //check if length of password > 6
        if(password.length <= 6) {
            return res.status(400).json({message: "Password length should be more than 6"})
        }

        const newUser = new User(
            {
                username: username,
                email: email,
                password: hashedPassword,
                address: address
            }
        )

        await newUser.save();
        return res.status(200).json({message: "Signup Successful"})

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

// Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const {username, password} = req.body;

        //check if username already exists
        const existingUser = await User.findOne({username})
        if(!existingUser) {
            return res.status(400).json({message: "User does not exist"})
        }

        //check if password is correct
        
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const authClaims = [
            {
                name: existingUser.username,
                role: existingUser.role
            }
        ]
        //generate token
        const token = jwt.sign(
            {authClaims}, "bookHaven123", {expiresIn: "30d"}
        )
        return res.status(200).json({message: "Login Successful", id:existingUser._id, role: existingUser.role, token: token});

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})
       
// Get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;
