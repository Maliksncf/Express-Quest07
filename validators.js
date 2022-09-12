const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255){
      errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
  
    // ...
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };

  const Joi = require("joi");

  const userSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
  });
  
  const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;
  
    const { error } = userSchema.validate(
      { firstname, lastname, email },
      { abortEarly: false }
    );
  
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  };
  
  module.exports = {
    validateMovie,
    validateUser,
  };