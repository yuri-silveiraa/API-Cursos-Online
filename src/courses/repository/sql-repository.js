const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError, ConflictError } = require('../../errors')

const handleNotFound = id => ([course]) =>
  course ?? Promise.reject(new NotFoundError({ resourceName: 'Course', resourceId: id }))

const handleUniqueUsernameError = title => error =>
  Promise.reject(
    error.code === 'ER_DUP_ENTRY'
      ? new ConflictError(`Course with title '${title}' already registered`)
      : error
  )

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('*')
        .from('courses')
        .then()
  
    const get = (id, transaction = knex) =>
      transaction
        .select('*')
        .from('courses')
        .where({ id })
        .then(handleNotFound(id))
  
    const insert = (course) =>
      knex.transaction(tx =>
        knex('courses')
          .insert(course)
          .then(([id]) => get(id, tx))
          .catch(handleUniqueUsernameError(course.title))
      )
  
    const update = course =>
      knex.transaction(tx =>
        knex('courses')
          .where({ id: course.id })
          .update(course)
          .then(() => get(course.id, tx))
      )
  
    const del = id =>
      knex('courses')
        .where({ id })
        .delete()
        .then()
    
    return {
        list,
        get,
        insert,
        update,
        del,
          }
        
    }
        
module.exports = {
     SQLRepository,
}