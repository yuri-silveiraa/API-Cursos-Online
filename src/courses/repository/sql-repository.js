const { knex: Knex } = require('knex')

const { database: config } = require('../../../knexfile')
const { NotFoundError, ConflictError } = require('../../errors')

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('*')
        .from('courses')
        .then(decodeUsers)
  
    const get = (id, transaction = knex) =>
      transaction
        .select('*')
        .from('courses')
        .where({ id })
        .then(handleNotFound(id))
        .then(decodeUser)
  
    const insert = (user) =>
      knex.transaction(tx =>
        knex('courses')
          .insert(encodeUser(user))
          .then(([id]) => get(id, tx))
          .catch(handleUniqueUsernameError(user.username))
      )
  
    const update = user =>
      knex.transaction(tx =>
        knex('users')
          .where({ id: user.id })
          .update(encodeUser(user))
          .then(() => get(user.id, tx))
      )
  
    const del = id =>
      knex('users')
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