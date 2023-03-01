const { knex: Knex } = require('knex')

const { database: config } = require('../../config/')
const { NotFoundError } = require('../../errors')

const handleNotFound = id => ([course_id]) =>
course_id ?? Promise.reject(new NotFoundError({ resourceName: 'course_id', resourceId: id }))

const SQLRepository = () => {
    const knex = Knex(config)
   
    const lessons = (id) => 
    knex
        .select('lessons.*')
        .from('courses')  
        .innerJoin('lessons', 'lessons.course_id', 'courses.id')
        .where('course_id', '=', id)  
        .then(data => data.map((elemento) => {
            return {
                id: elemento.id,
                course_id: elemento.course_id,
                title: elemento.title,
                lessonDescription: elemento.description
                    }
                    })) 

    const get = (course_id) =>
      knex
        .select('courses.*','journeys_courses.journey_id')
        .from('courses')  
        .innerJoin('journeys_courses', 'journeys_courses.course_id', 'courses.id')
        .where('course_id', '=', course_id) 
        .then(result => result.map((element) => {
            return {
              id: element.id,
              journey_id: element.journey_id,
              name: element.title,
              courseDescription: element.description,
              lessons: lessons(course_id, element.lessons)
            }
            }),handleNotFound(course_id))

    return {
        get,
          }
        
    }
        
module.exports = {
     SQLRepository,
}