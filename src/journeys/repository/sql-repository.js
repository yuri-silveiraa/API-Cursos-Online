const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError } = require('../../errors')

const handleNotFound = id => ([course]) =>
  course ?? Promise.reject(new NotFoundError({ resourceName: 'Course', resourceId: id }))

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('*')
        .from('journeys')
        .then()
  
    const get = (id) =>
      knex
        .select('*')
        .from('journeys')
        .where({ id })
        .then(handleNotFound(id))
  
    const insert = (journey) =>
    knex.transaction(tx => 
      knex('journeys')
        .insert(journey)
        .then(([id]) =>  get(id, tx))
      )
  
    const update = journey =>
      knex.transaction(tx =>
        knex('journeys')
          .where({ id: journey.id })
          .update(journey)
          .then(() => get(journey.id, tx))
      )
  
    const del = id =>
      knex('journeys')
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