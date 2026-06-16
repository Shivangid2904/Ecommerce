const productModel = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image, rating } = req.body;

    const product = {
      name,
      description,
      price,
      category,
      stock,
      image,
      rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertedId = await productModel.createProduct(product);
    const createdProduct = await productModel.getProductById(insertedId);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    const existing = await productModel.getProductById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    await productModel.updateProduct(req.params.id, updates);
    const updated = await productModel.getProductById(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const existing = await productModel.getProductById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    await productModel.deleteProduct(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
