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


  
    const insert = (course) =>
    knex.transaction(tx => 
      knex('journeys_courses')
        .insert(course)
        .then(([id]) =>  get(id, tx))
      )
  
    const update = course =>
      knex.transaction(tx =>
        knex('journeys_courses')
          .where({ id: course.id })
          .update(course)
          .then(() => get(course.id, tx))
      )
  
    const del = id =>
      knex('journeys_courses')
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