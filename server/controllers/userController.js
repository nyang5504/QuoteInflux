require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserToken = async (req, res) => {
    const token = req.cookies.jwt;
    console.log("Cookies: ", req.cookies);
    if(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            console.log("payload: ", decodedToken);
            res.status(200).json({ message: "User login successfully with token!" });
        } catch (error) {
            console.log("Bad token");
            res.status(401).json({message: "Unauthorized1"});
        }
    } else {
        res.status(404).json({message: "Not Found"});
    }
}

exports.getUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign({username}, process.env.SECRET_KEY, {expiresIn: '6h'});
                res
                .cookie('jwt', token, {httpOnly: true, maxAge: 6 * 60 * 60 * 1000})
                .status(200)
                .json({ message: "User login successfully!"});
            } else {
                res.status(401).json({message: "Incorrect username or password!"});
            }
        } else {
            res.status(404).json({message: "User not found!"});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: 'Username already exists. Try again.'});
        }

        const newUser = new User({username, password});

        try {
            const savedUser = await newUser.save();
            console.log('User saved:', savedUser);
        } catch (err) {
            console.error('Error saving user:', err);
        }

        res.status(201).json({message: "Signed up successfully!"});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const {username, password, newpass} = req.body;
    try {
        const user = await User.findOne({username, password});
        if(user) {
            //set new password
        } else {
            res.status(401).json({message: "Incorrect password!"});
        }
        const validPassword = await user.comparePassword(password);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username}, {password});
        if(user) {
            await user.remove();
            res.status(200).json({ message: "User deleted successfully!" });
        } else {
            res.status(401).json({message: "Incorrect password!"});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};