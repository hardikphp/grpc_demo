import { regionModel } from "../models";

const insertOne = async (data) => {
  let newClass = {},
    saveClass = null;
  newClass = new regionModel(data);
  saveClass = await newClass.save();
  return saveClass;
};

const updateRegion = async (id, update) => {
  let data = await regionModel.findOneAndUpdate({ _id: id }, update);
  return data;
};

const findRegion = async () => {
  let data = await regionModel.find(
    { isActive: true, isDeleted: false },
    { name: 1, desc: 1 }
  );
  console.log('Service data', data)
  return data;
};

export default {
  insertOne,
  updateRegion,
  findRegion,
};
