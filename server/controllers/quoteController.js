const Quote = require('../models/quoteModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getCollection = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(200).json({error: "No token provided"});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const collectionArr = await Quote.find({username});
        // .select('-username', '-id');
        res.status(200).json({collectionArr});
    } catch(error) {
        console.log(error);
        res.status(400);
    }
}

exports.getQuote = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const id = req.params.id;
        if(!token) {
            return res.status(204).json({error: "No token"});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const found = await Quote.findOne({username, id});
        if(found){
            return res.status(200).json({message: "yellow this"});
        }
        else{
            return res.status(204).json({message: "white this"});
        }
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

exports.saveQuote = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const quote = req.body.currentQuote;
        if(!token) {
            return res.status(404).json({error: 'Not found'});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const newQuote = new Quote({username, id: quote.id, quote: quote.quote, author: quote.author, tags: quote.tags});
        const savedQuote = await newQuote.save();
        res.status(200).json(savedQuote);
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Unauthorized'});
    }
}

exports.deleteQuote = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const params = req.params.id;
        if(!token) {
            return res.status(404).json({error: 'Not found'});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const deletedQuote = await Quote.findOneAndDelete({username, id: params});
        console.log("deletedQuote: ", deletedQuote);
        res.status(200).json(deletedQuote);
    } catch(e) {
        res.status(400).json({message: e});
    }
}