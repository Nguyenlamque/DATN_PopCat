import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, maxlength: 255 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // lấy tên danh mục trong products
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
