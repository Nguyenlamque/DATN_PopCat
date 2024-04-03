import Category from "../Models/Category.js";
import validCategory from "../validation/Category.js";

//  hàm getAll Categories
export const getAll_Category = async (req, res) => {
  try {
    const data = await Category.find({}).populate("products");

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "không tìm thấy categories nào",
      });
    }
    return res.status(200).json({
      message: "lấy danh sách sản phẩm thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
      error: error.message,
    });
  }
};

// hàm getDetails Category

export const getDetail_Category = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy categories nào",
      });
    }
    return res.status(200).json({
      message: "Tìm chi tiết sản phẩm thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
      message: error.message,
    });
  }
};

//  hàm create Category

export const create_Category = async (req, res) => {
  try {
    // Validate category
    const { error } = validCategory.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      res.status(400).json({
        message: errors,
      });
    }
    const data = await Category.create(req.body);
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "không tạo được category",
      });
    }
    return res.status(200).json({
      message: "Tạo category thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
      message: error.message,
    });
  }
};

//  Hàm update category

export const update_Category = async (req, res) => {
  try {
    // Validate category
    const { error } = validCategory.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      res.status(400).json({
        message: errors,
      });
    }

    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      news: true,
    });
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Update Category không thành công",
      });
    }
    return res.status(200).json({
      message: "Update Category thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
      error: error.message,
    });
  }
};

// hàm xóa Category

export const delete_Category = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: " Delete Category không thành công",
      });
    }
    return res.status(200).json({
      message: "Delete Category thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
      name: message.name,
      message: error.message,
    });
  }
};
