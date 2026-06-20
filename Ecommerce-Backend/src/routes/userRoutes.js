const express = require('express');
const { body, param } = require('express-validator');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  createUser
);

router.get('/', getAllUsers);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('User ID must be valid')],
  validateRequest,
  getUserById
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('User ID must be valid'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ],
  validateRequest,
  updateUser
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('User ID must be valid')],
  validateRequest,
  deleteUser
);

module.exports = router;