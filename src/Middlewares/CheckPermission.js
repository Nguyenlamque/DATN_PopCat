import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";
dotenv.config();
const { SECRET_CODE } = process.env;
export const checkPermission = async (req, res, next) => {
  try {
    // b1: kiểm tra người dùng đã đăng nhập hay chưa
    const token = req.headers.authorization?.split(" ")[1];

    // b2: Kiểm tra token
    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    // b3: kiểm tra quyền của người dùng
    const decoded = jwt.verify(token, SECRET_CODE);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "token lỗi",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "bạn không có quyền làm việc này",
      });
    }
    // b4: Next
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
};
