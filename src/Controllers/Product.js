// import { validProduct } from "../validation/Product.js";
import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

// Hàm lấy tất cả các sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({}).populate("categoryId");
    if (!data) {
      return res.status(404).json({
        mesages: "không tìm thấy sản phẩm nào ",
      });
    }
    // trả về data
    return res.status(200).json({
      mesages: "lấy tất cả sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      mesages: "lỗi server",
      message: error.message,
    });
  }
};

//  Hàm lấy chi tiết sản phẩm
export const getDetailProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("categoryId");
    if (!data || data.length === 0) {
      return res.status(404).json({
        mesages: "Không tìm được sản phẩm ",
      });
    }

    // trả về data
    return res.status(200).json({
      mesages: "Lấy chi tiết sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      mesages: "Lỗi Server",
    });
  }
};

// Hàm tạo sản phẩm

export const createProduct = async (req, res) => {
  const data = await Product.create(req.body);
  try {
    // const { error } = validProduct.validate(req.body, { abortEarly: false });
    // if (error) {
    //   const errors = error.details.map((err) => message.err);
    //   return res.status(400).json({
    //     message: "Validation failed",
    //     error: errors,
    //   });
    // } hàm này chưa trả ra error  đang trong quá trình fix

    if (!data || data.length === 0) {
      return res.status(400).json({
        mesages: "Không tạo được sản phẩm ",
      });
    }
    // Cập nhật danh sách sản phẩm của danh mục tương ứng
    const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });

    if (!updateCategory) {
      return res.status(400).json({
        mesages: "update category không thành công",
        data :data,
      });
    }

    return res.status(200).json({
      mesages: "Tạo sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      mesages: "Lỗi server",
    });
  }
};

//  hàm update sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!data) {
      return res.status(400).json({
        mesages: "Không tìm thấy sản phẩm để cập nhật",
      });
    }
    // Cập nhật danh sách sản phẩm của danh mục tương ứng
    const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });
    // kiểm tra update category có thành công không
    if (!updateCategory) {
      return res.status(400).json({
        mesages: "Lỗi server khi cập nhật danh mục",
      });
    }
    //  trả về dữ liệu
    return res.status(200).json({
      mesages: "Update sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      mesages: "Lỗi server",
    });
  }
};

//  Hàm xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        mesages: "Không tìm thấy sản phẩm để xóa",
      });
    }

    return res.status(200).json({
      mesages: "Xóa sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      mesages: "Lỗi server",
    });
  }
};
