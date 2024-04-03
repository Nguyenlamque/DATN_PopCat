import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://nguyenlamque99:Lamque99@cluster0.zpk24wm.mongodb.net/PopCat");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

export default connectToMongoDB;
