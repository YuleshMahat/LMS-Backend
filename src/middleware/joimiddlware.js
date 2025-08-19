import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? res
        .status(400)
        .json({ status: false, message: "Invalid data" + error.message })
    : next();
};

const addBookValidator = (req, res, next) => {
  let addBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    thumbnail: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.string().required(),
  });

  joiValidator(addBookSchema, req, res, next);
};

const loginSchema = (req, res, next) => {
  let loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  joiValidator(loginSchema, req, res, next);
};
