import pkg from "joi";
const Joi = pkg;

export const valid_SignUP = Joi.object({
  userName: Joi.string().required().min(6).max(255).messages({
    "String.empty": "Bạn không được để trống trường userName",
    "String.min": "Số kí tự tối thiểu phải là 6",
    "String.max": "Số kí tự tối thiểu phải là 255",
  }),

  email: Joi.string()
    .required()
    .email()
    .regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      "string.empty": "Email không được để trống.",
      "string.email": "Email không hợp lệ.",
      "string.min": "Email phải có ít nhất {#limit} ký tự.",
      "string.max": "Email không được vượt quá {#limit} ký tự.",
    }),

  passWord: Joi.string().required().min(6).max(255).messages({
    "any.required": "Mật khẩu là bắt buộc.",
    "string.empty": "Mật khẩu không được để trống.",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
    "string.max": "Mật khẩu không được vượt quá {#limit} ký tự.",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("passWord"))
    .messages({
      "any.required": "Xác nhận mật khẩu là bắt buộc.",
      "string.empty": "Xác nhận mật khẩu không được để trống.",
      "string.min": "Xác nhận mật khẩu phải có ít nhất {#limit} ký tự.",
      "string.max": "Xác nhận mật khẩu không được vượt quá {#limit} ký tự.",
      "any.only": "Xác nhận mật khẩu phải giống với mật khẩu đã nhập.",
    }),
  role: Joi.string(),
});

export const valid_SignIn = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      "string.empty": "Email không được để trống.",
      "string.email": "Email không hợp lệ.",
      "string.min": "Email phải có ít nhất {#limit} ký tự.",
      "string.max": "Email không được vượt quá {#limit} ký tự.",
    }),

  passWord: Joi.string().required().min(6).max(255).messages({
    "any.required": "Mật khẩu là bắt buộc.",
    "string.empty": "Mật khẩu không được để trống.",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
    "string.max": "Mật khẩu không được vượt quá {#limit} ký tự.",
  }),
});
