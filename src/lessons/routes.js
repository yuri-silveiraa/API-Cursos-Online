const { Router } = require('express')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { LessonsRepository } = require('./repository')
const repository = LessonsRepository()

// acessar uma lesson 

const GetLessonschema = {
  params: Joi.object({
    id: Joi.required(),
  }),
}

const getjourney_course = async (req, res) => {
  const id = req.params.id

  const journey = await repository.get(id)

  res.status(200).send(journey)
}

router.get('/:id', validate(GetLessonschema) ,withAsyncErrorHandler(getjourney_course))

module.exports = router;