const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const protectAdmin = require('../middleware/authMiddleware');

router.post('/', createOrder); // public - customer checkout
router.get('/', protectAdmin, getOrders);
router.get('/:id', protectAdmin, getOrderById);
router.put('/:id', protectAdmin, updateOrderStatus);

module.exports = router;