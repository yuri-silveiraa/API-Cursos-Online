class DomainError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
  }
  
  class ValidationError extends DomainError {
      constructor({ message = 'Invalid parameters', validations }) {
        super(message)
        this.validations = validations
      }
  }
  
  module.exports = { ValidationError }