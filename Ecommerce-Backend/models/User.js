const {ObjectId} = require('mongodb');
const {getDB} = require('../config/db');

const userCollection = () => getDB().collection('users');

const createUser = async (user) => {
  const result = await userCollection().insertOne(user);
  return result.insertedId;
};

const getAllUsers = async () => {
  return await userCollection().find({}).toArray();
};
const getUserById = async (id) => {
  return await userCollection().findOne({_id: new ObjectId(id)});
};
const updateUser = async (id, updatedUser) => {
  await userCollection().updateOne({_id: new ObjectId(id)}, {$set: updatedUser});
};
const deleteUser = async (id) => {
  await userCollection().deleteOne({_id: new ObjectId(id)});
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};  

