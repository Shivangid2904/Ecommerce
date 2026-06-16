const userModel = require('../models/User.js');

const createUser = async (user) => {
  return await userModel.createUser(user);
};

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const updateUser = async (id, updatedUser) => {
  return await userModel.updateUser(id, updatedUser);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};