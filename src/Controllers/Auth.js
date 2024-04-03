import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { valid_SignIn, valid_SignUP } from "../validation/User.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE;

// HÀM SIGNUP
export const signUp = async (req, res) => {
  try {
    // validate dữ liệu người dùng
    const { error } = valid_SignUP.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errors });
    }

    // kiểm tra email đa tồn tại trong hệ thống chưa
    const exitingUser = await User.findOne({ email: req.body.email });
    if (exitingUser) {
      return res.status(400).json({
        message: "Email này đã được đăng kí bạn có muốn đăng nhập không",
      });
    }
    // mã hóa password
    const hashedPassword = await bcrypt.hash(req.body.passWord, 10);
    //  khởi tạo user trong db
    const user = await User.create({ ...req.body, passWord: hashedPassword });
    // thông báo cho người dùng đăng kí thành công
    return res.status(200).json({
      message: " Bạn đã đăng kí thành công",
      data: user,
    });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    return res.status(400).json({
      message: "Lỗi server",
    });
  }
};

// hàm SIGNIN
export const signIn = async (req, res) => {
  try {
    // b1: kiểm tra validate
    const { error } = valid_SignIn.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // b2: kiểm tra email có tồn tại hay không
    const isEmail = await User.findOne({ email: req.body.email });
    if (!isEmail) {
      return res.status(404).json({
        message: "Email chưa được đăng kí. Bạn có muốn đăng kí không?",
      });
    }

    // b3: kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(req.body.passWord, isEmail.passWord);
    if (!isMatch) {
      return res.status(401).json({
        message: "Mật khẩu không đúng",
      });
    }

    // Ẩn mật khẩu trước khi gửi lại dữ liệu người dùng
    isEmail.passWord = undefined;

    // Tạo token
    const accessToken = jwt.sign({ _id: isEmail._id }, SECRET_CODE, {
      expiresIn: "1h",
    });

    // Trả về kết quả
    return res.status(200).json({
      message: "Đăng nhập thành công",
      isEmail,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};
