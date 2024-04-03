import joi from "joi";

const validCategory = joi.object({
  name: joi.string().required().min(3).max(255),
  slug: joi.string().required().min(3).max(255),
});

export default validCategory;
