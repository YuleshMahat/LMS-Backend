import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? res
        .status(400)
        .json({ status: false, message: "Invalid data" + error.message })
    : next();
};

export const addBookValidator = (req, res, next) => {
  let addBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.string().required(),
    description: Joi.string(),
  });

  joiValidator(addBookSchema, req, res, next);
};

export const editBookValidator = (req, res, next) => {
  let editBookSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string(),
    author: Joi.string(),
    isbn: Joi.string(),
    genre: Joi.string(),
    publishedYear: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
  });

  joiValidator(editBookSchema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  console.log("joi middleware triggered");
  let loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  joiValidator(loginSchema, req, res, next);
};
