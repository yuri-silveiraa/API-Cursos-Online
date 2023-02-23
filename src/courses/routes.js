const { Router } = require('express')
const { expression, isExpression } = require('joi')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { coursesRepository } = require('./repository/index')


// Criar um curso 

const CreateSchemaCourse = {
  body: Joi.object({
    thumb: Joi.string().required(),
    description: Joi.string().max(1000),
    instructor: Joi.string()
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

router.put('/update', async (req, res) =>{})

// Delete de um curso

router.delete('/delete', async (req, res) =>{})

// Acessar um curso 

router.get('/:id', async (req, res) =>{})

module.exports = router;