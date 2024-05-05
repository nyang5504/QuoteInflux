const Quote = require('../models/quoteModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getCollection = async (req, res) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error: "No token provided"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const collectionArr = await collection.find({username}).select('-username');
        res.json({message: "collectionArr",collectionArr});
    } catch(error) {
        console.log("");
    }
}

exports.saveQuote = async (req, res) => {
    const token = req.cookies.jwt;
    const quote = req.body;
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("payload: " + decodedToken);
        const username = decodedToken.username;
        const newQuote = new Quote({quote, username});
        const savedQuote = await newQuote.save();
        res.json(savedQuote);
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'});
    }


    res.json({message:"hello"});
}

exports.deleteQuote = async (req, res) => {
    res.json({message:"hello"});

}