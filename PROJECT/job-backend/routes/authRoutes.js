const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔥 check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already exists ❌");
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.send("Registered successfully ✅");

    } catch (err) {
        res.send("Error in registration ❌");
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.send("Invalid credentials ❌");
        }

        res.send("Login successful");

    } catch (err) {
        res.send("Login error ❌");
    }
});

module.exports = router;