import User from "./userSchema.js";

export const getUsers = (filter) => {
  // list of users
  return User.find(filter);
};

// get user by id
export const getUserById = (id) => {
  return User.findById(id);
};

// get user by filter
export const getUserByEmail = (email) => {
  // filter: {email: 'email'}
  // filter: {username: 'name'}
  return User.findOne({ email });
};

// creat user
export const createUser = (userObj) => {
  return User.insertOne(userObj);
};

// update user
export const updateUser = (id, updateObj) => {
  return User.findByIdAndUpdate(id, updateObj);
};

// delete user
export const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};
