const bcrypt = require('bcrypt');
const Admin = require('../models/admin.js');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = await Admin.create({
            username: req.body.username,
            password: hashedPassword
        });
        res.status(201).json({
            message: "Admin created successfully!",
            data: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error("CREATE Admin ERROR:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed!",
                data: error.message
            });
        }
        res.status(500).json({
            message: "Failed to create Admin",
            data: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username});
        if(!admin) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        };
        const passWord = await bcrypt.compare(req.body.password, admin.password);
        if (!passWord) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        };
        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: "Login successful!",
            token: token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
           
    } catch (error) {
        console.error("LOGIN ADMIN ERROR:", error);
        res.status(500).json({
            message: "Login failed",
            data: error.message
        });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};