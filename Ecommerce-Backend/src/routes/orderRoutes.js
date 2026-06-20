const express = require('express');
const { body, param } = require('express-validator');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('userId').isMongoId().withMessage('User ID must be valid'),
    body('products').isArray({ min: 1 }).withMessage('Products array is required'),
    body('products.*.productId').isMongoId().withMessage('Each product must include a valid productId'),
    body('products.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be at least 1'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
    body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered'])
      .withMessage('Invalid order status'),
  ],
  validateRequest,
  createOrder
);

router.get('/', getAllOrders);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Order ID must be valid')],
  validateRequest,
  getOrderById
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Order ID must be valid'),
    body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered'])
      .withMessage('Invalid order status'),
    body('products').optional().isArray({ min: 1 }).withMessage('Products must be an array with at least one item'),
    body('products.*.productId').optional().isMongoId().withMessage('Each product must include a valid productId'),
    body('products.*.quantity')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Quantity must be at least 1'),
  ],
  validateRequest,
  updateOrder
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Order ID must be valid')],
  validateRequest,
  deleteOrder
);

module.exports = router;