import { Schema, model } from "mongoose";

const regionSchema = new Schema(
  {
    name: { type: String },
    desc: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const region = new model("Region", regionSchema);

export default region;
