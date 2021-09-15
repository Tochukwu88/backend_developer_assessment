const { body, check, validationResult } = require('express-validator')
const blogValidationRules = () => {
  return [
    
    check('title','title is required').notEmpty().withMessage('title is required'),
    check('content','content is required').notEmpty().isLength({ min: 30 }).withMessage('content is to short'),
    
    
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  blogValidationRules,
    
    validate,
   
    
  }
         