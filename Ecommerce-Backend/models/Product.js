const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const productCollection = () => getDB().collection('products');

const getAllProducts = async () => {
  return await productCollection().find({}).toArray();
};

const getProductById = async (id) => {
  return await productCollection().findOne({ _id: new ObjectId(id) });
};

const createProduct = async (product) => {
  const result = await productCollection().insertOne(product);
  return result.insertedId;
};

const updateProduct = async (id, updated) => {
  await productCollection().updateOne({ _id: new ObjectId(id) }, { $set: updated });
};

const deleteProduct = async (id) => {
  await productCollection().deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
