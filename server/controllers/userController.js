require('dotenv').config();
const User = require('../models/userModel');
const Quotes = require('../models/quoteModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if(token) {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            return res.status(200).json({username: decodedToken.username});
        } else {
            return res.status(404).json({message: "Not Found"});
        }
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

exports.getUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign({username}, process.env.SECRET_KEY);
                return res
                        .cookie('jwt', token, {httpOnly: true, maxAge: 1000*60*60*24})
                        .status(200)
                        .json({ message: "User login successfully!"});
            } else {
                return res.status(401).json({message: "Incorrect username or password!"});
            }
        } else {
            return res.status(404).json({message: "User not found!"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
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
            return res.status(201).json({message: "Signed up successfully!"});
        } catch (err) {
            console.error('Error saving user:', err);
            return res.status(400).json({message: "Error saving user"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.logout = async(req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'User signed out.' });
}

exports.updateUsername = async (req, res) => {
    const {confirmOldPassword, newUsername} = req.body;
    const token = req.cookies.jwt;
    try {
        if(await User.findOne({username: newUsername})){
            return res.status(409).json({message: "This username is already taken"});
        }
        if(!token) {
            return res.status(404).json({message: "token not found"});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const user = await User.findOne({username});
        const samePass = await bcrypt.compare(confirmOldPassword, user.password);
        if(samePass) {
            //set new password
            const updated = await User.findOneAndUpdate({username: username}, {$set:{username: newUsername}});
            const updatedQuotes = await Quotes.updateMany({username: username}, {$set:{username: newUsername}});
            res.status(200).json({message: "Updated Username"});
        } else {
            res.status(401).json({message: "Incorrect password!"});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.updatePassword = async (req, res) => {
    const {confirmOldPassword, newPassword} = req.body;
    const token = req.cookies.jwt;
    try {
        if(!token){
            return res.status(404).json({message: "token not found"})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const user = await User.findOne({username});
        const samePass = await bcrypt.compare(confirmOldPassword, user.password);
        if(samePass) {
            //set new password
            const updated = await User.findOneAndUpdate({username:username}, {$set:{password: newPassword}});
            res.status(200).json({message: "Updated Password"});
        } else {
            res.status(401).json({message: "Incorrect password!"});
        }
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