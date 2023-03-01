const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError } = require('../../errors')

const handleNotFound = id => ([journey_id]) =>
journey_id ?? Promise.reject(new NotFoundError({ resourceName: 'journey_id', resourceId: id }))

const SQLRepository = () => {
    const knex = Knex(config)
  
    const list = () =>
      knex
        .select('*')
        .from('journeys_courses')
        .then()
   
    const get = (journey_id) =>
      knex
        .select('*')
        .from('courses')  
        .innerJoin('journeys_courses', 'journeys_courses.course_id', 'courses.id')
        .where('journey_id', '=', journey_id)  
        .then( data => data.map((elemento) => {
          return {
            id: elemento.id,
            journey_id: elemento.journey_id,
            name: elemento.title,
            description: elemento.description
          }
          }) ,handleNotFound(journey_id))

    return {
        list,
        get,
          }
        
    }
        
module.exports = {
     SQLRepository,
}