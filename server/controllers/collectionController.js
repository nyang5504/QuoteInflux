const collection = require('../models/collectionModel');
const jwt = require('jsonwebtoken');

exports.getCollection = async (req, res) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({error: "No token provided"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;
        const collectionArr = await collection.find({username});
        // console.log(collectionArr);
        res.json({message: "collectionArr",collectionArr});
    } catch(error) {
        console.log("");
    }
}

exports.saveQuote = async (req, res) => {
    const token = req.headers.authorization;
    res.json({message:"hello"});
}

exports.deleteQuote = async (req, res) => {
    res.json({message:"hello"});

}