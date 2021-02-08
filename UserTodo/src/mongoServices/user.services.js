import { userModel } from "../models";

const addUser = async (data) => {
  let newUser = {},
    saveUser = null;
  newUser = new userModel(data);
  saveUser = await newUser.save();
  return saveUser;
};

const updateUser = async (id, update) => {
  let data = await userModel.findOneAndUpdate({ _id: id }, update);
  return data;
};

const findUser = async () => {
  let data = await userModel.find(
    { isActive: true, isDeleted: false },
    { name: 1, email: 1, cell: 1, region: 1 }
  );
  return data;
};

export default {
  addUser,
  updateUser,
  findUser,
};
