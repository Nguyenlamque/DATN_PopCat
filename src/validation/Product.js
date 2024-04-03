import joi from "joi";

export const validProduct = joi.object({
  name: joi.string().required().min(6).max(255).messages({
    "String.empty": "Bạn không được để trống trường Name",
    "String.min": "Số kí tự tối thiểu phải là 6 ",
  }),
  image: joi.string().required().max(255).messages({
    "String.empty": "Bạn không được để trống trường Name",
    "String.max": "Số kí tự tối thiểu phải là 255 ",
  }),
  price: joi.number().required().messages({
    "String.empty": "Bạn không được để trống giá sản phẩm",
  }),
  desc: joi.string().required().max(255).messages({
    "String.empty": "Bạn không được để trống mô tả",
    "String.max": "Số kí tự tối thiểu phải là 255 ",
  }),
});
