const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
      "any.required": "Name must be provided",
      "string.empty": "Name can't be empty",
      "string.min": "Name should have a minimum length of {#limit} characters",
      "string.max": "Name should have a maximum length of {#limit} characters",
    }),
    gender: Joi.string().valid("Male", "Female").default("Male").messages({
      "any.only": "Gender must choose from specified options",
    }),
    birthday: Joi.string().required().messages({
      "any.required": "Birthday must be provided",
      "string.empty": "Birthday can't be empty",
    }),
    occupation: Joi.string()
      .valid("Student", "Teacher", "Engineer", "Unemployed")
      .default("Student")
      .messages({
        "any.only": "Occupation must choose from specified options",
      }),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^09\d{8}$/)
      .required()
      .messages({
        "string.empty": "Phone number can't be empty",
        "string.length": "Phone number must be exactly 10 digits long",
        "string.pattern.base":
          "Phone number must start with '09' and contain only digits",
        "any.required": "Phone number is required",
      }),
    image: Joi.string().messages({
      "string.empty": "Image can't be empty",
    }),
  });

  return schema.validate(data);
};

module.exports = { userValidation };
