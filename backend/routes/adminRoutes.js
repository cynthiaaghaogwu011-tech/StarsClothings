const express = require('express');
const router = express.Router();
const {registerAdmin, loginAdmin} = require('../controllers/adminController.js');
const protectAdmin = require('../middleware/authMiddleware.js');

router.post('/register', protectAdmin, registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;