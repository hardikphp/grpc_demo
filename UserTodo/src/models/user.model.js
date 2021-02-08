import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    cell: { type: String },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    regionName: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const user = new model("User", userSchema);
const getUserModel = async (conn) => {
  return conn.model("User", userSchema);
};
export default { user, getUserModel };
