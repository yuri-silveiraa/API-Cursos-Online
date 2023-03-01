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
    
    const courseId = () => 
      knex
        .select('id')
        .from('courses')
        .then()
   
    const get = (journey_id) =>
      knex('journeys_courses')
        .join('courses', 'journeys_courses.course_id','=', 'courses.id')
        .where('courses.id', '=', courseId)  
        .select('courses.*')
        .then(handleNotFound(journey_id))

    return {
        list,
        get,
          }
        
    }
        
module.exports = {
     SQLRepository,
}