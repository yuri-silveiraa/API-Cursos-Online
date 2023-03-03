const { knex: Knex } = require('knex')

const config = require('../../knexfile').development
const { NotFoundError } = require('../../errors')

const SQLRepository = () => {
    const knex = Knex(config)
   
    const lessons = async (id) => {
      
      const data = await knex
        .select('lessons.*')
        .from('courses')
        .innerJoin('lessons', 'lessons.course_id', 'courses.id')
        .where('course_id', '=', id)
        .then(data => data)
    
      return data.map((elemento) => {
        return {
          id: elemento.id,
          course_id: elemento.course_id,
          title: elemento.title,
          lessonDescription: elemento.description
        }
      })
    }

    const get = async (course_id) => {
      const result = await knex
        .select('courses.*','journeys_courses.journey_id')
        .from('courses')  
        .innerJoin('journeys_courses', 'journeys_courses.course_id', 'courses.id')
        .where('course_id', '=', course_id) 
    
      const course = result.map((element) => {
        return {
          id: element.id,
          journey_id: element.journey_id,
          name: element.title,
          courseDescription: element.description,
        }
      })[0]
    
      if (!course) {
        throw new NotFoundError({ resourceName: 'course_id', resourceId: course_id })
      }
    
      const courseLessons = await lessons(course_id)
    
      return {
        ...course,
        lessons: courseLessons,
      }
    }

      

    return {
        get,
        lessons,
    }
}

module.exports = {
    SQLRepository,
}