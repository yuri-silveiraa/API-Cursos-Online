const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError } = require('../../errors')

const handleNotFound = id => ([course]) =>
  course ?? Promise.reject(new NotFoundError({ resourceName: 'Course', resourceId: id }))

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('title')
        .select('id')
        .from('journeys')
        .then(data => data.map((elemento) => {
          return {
            id: elemento.id,
            name: elemento.title
          }
          }))
  
    const get = (id) =>
      knex
        .select('*')
        .from('journeys')
        .where({ id })
        .then(handleNotFound(id))
  

    return {
        list,
        get,
          }
        
    }
        
module.exports = {
     SQLRepository,
}