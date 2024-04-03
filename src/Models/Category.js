import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "Uncategory",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "Uncategory",
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // lấy tên danh mục trong products
  },
  { versionKey: false, timestamps: true }
);
// Tắt versionKey và bật timestamps

export default mongoose.model("Category", categorySchema);
