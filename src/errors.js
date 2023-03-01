class DomainError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
  }
  class NotFoundError extends DomainError {
    constructor({ resourceName, resourceId }) {
      super(`Resource '${resourceName}' with identifier '${resourceId}' not found`)
      this.resourceName = resourceName
      this.resourceId = resourceId
    }
  }

  class ConflictError extends DomainError {
  }
  
  module.exports = {
    NotFoundError,
    ConflictError
   }