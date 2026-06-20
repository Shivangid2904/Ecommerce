const express = require('express');
const { body, param } = require('express-validator');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be 0 or greater'),
  ],
  validateRequest,
  createProduct
);

router.get('/', getAllProducts);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Product ID must be valid')],
  validateRequest,
  getProductById
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Product ID must be valid'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be 0 or greater'),
  ],
  validateRequest,
  updateProduct
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Product ID must be valid')],
  validateRequest,
  deleteProduct
);

module.exports = router;