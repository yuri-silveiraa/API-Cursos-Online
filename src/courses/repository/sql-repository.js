const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError, ConflictError } = require('../../errors')

const handleNotFound = id => ([title]) =>
  title ?? Promise.reject(new NotFoundError({ resourceName: 'title', resourceId: id }))

const handleUniqueUsernameError = title => error =>
  Promise.reject(
    error.code === 'ER_DUP_ENTRY'
      ? new ConflictError(`User with username '${title}' already registered`)
      : error
  )

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('title')
        .from('courses')
        .then()
  
    const get = (id, transaction = knex) =>
      transaction
        .select('*')
        .from('courses')
        .where({ id })
        .then(handleNotFound(id))
  
    const insert = (courses) =>
      knex.transaction(tx =>
        knex('courses')
          .insert(courses)
          .then(([id]) => get(id, tx))
          .catch(handleUniqueUsernameError(courses.title))
      )
  
    const update = user =>
      knex.transaction(tx =>
        knex('courses')
          .where({ id: user.id })
          .update(user)
          .then(() => get(user.id, tx))
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