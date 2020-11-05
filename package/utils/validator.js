import AsyncValidator from 'async-validator'

export function validator (model, rules) {
  let validator = new AsyncValidator(rules)
  return new Promise((resolve) => {
    
    validator.validate(model, (errors) => {
      if (errors) {
        const [message] = errors.map(error => error.message) || []
        resolve({ success: false, message })
      } else {
        resolve({ success: true })
      }
    })
  })
}
