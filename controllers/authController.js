const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const register = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const userExist = await User.findByEmail(email);
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({name, email, password: hashedPassword});

        //generate jwt token
        const token = generateToken(user.id);

        res.status(201).json({message: 'User created successfully'});
    }catch(error){
        return res.status(500).json({ message: error.message || "Internal server error" });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message: 'User login successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }catch(error){
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

module.exports = {
    register : register,
    login : login,
};