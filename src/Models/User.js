import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    role: { type: String, default: "member" },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", UserShema);
