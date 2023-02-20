const { Router } = require('express')
const { expression, isExpression } = require('joi')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { coursesRepository } = require('./repository/index')


// Criar um curso 

const CreateSchemaCourse = {
  body: Joi.objetc({
    thumb: Joi.string.notNullable(),
    description: Joi.string.max(1000).nullable(),
    instructor: Joi.string.notNullable()
  })
}

const createCourse = async (req, res) =>{
    const course = req.body
    const inserted = await coursesRepository.insert(course)
  
    res
      .status(201)
      .header('Location', `/courses/${inserted.id}`)
      .send(inserted)
  }

router.post('/create', validate(CreateSchemaCourse) ,withAsyncErrorHandler(createCourse))

// Update de um curso

router.put('/update', async (req, res) =>{

})