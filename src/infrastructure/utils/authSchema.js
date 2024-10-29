import Joi from 'joi';

const authSchema = formType => {
  return Joi.object({
    name:
      formType === 'register'
        ? Joi.string().required().messages({
            'string.empty': 'Name is required',
          })
        : Joi.string().allow(''),

    email: Joi.string()
      .email({ tlds: { allow: ['com', 'net', 'org'] } })
      .pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'string.pattern.base': 'Invalid email format',
        'any.required': 'Email is required',
      }),

    password: Joi.string()
      .pattern(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/, 'password')
      .required()
      .messages({
        'string.pattern.name': 'Password must have 7+ chars and a number',
        'any.required': 'Password is required',
      }),
  });
};

export default authSchema;
