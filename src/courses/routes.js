const { Router } = require('express')
const { expression, isExpression } = require('joi')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { coursesRepository } = require('./repository')
const repository = coursesRepository()

// Criar um curso 

const CreateSchemaCourse = {
  body: Joi.object({
    thumb: Joi.string().required(),
    description: Joi.string().max(1000).required(),
    instructor: Joi.string().required(),
    level: Joi.string().required(),
    title: Joi.string().required(),
    slug: Joi.string().required(),
  })
}

const createCourse = async (req, res) =>{
    const course = req.body
    const inserted = await repository.insert(course)
  
    res
      .status(201)
      .header('Location', `/courses/${inserted.id}`)
      .send(inserted)
  }

router.post('/create', validate(CreateSchemaCourse) ,withAsyncErrorHandler(createCourse))

// Update de um curso

const UpdateCourseSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
  }).or('password', 'firstName', 'lastName')
}

const updateCourse = async (req, res) => {
  const id = parseInt(req.params.id)

  const body = req.body

  const registered = await repository.get(id)

  const user = { ...registered, ...body, id }
  const updated = await repository.update(user)
  res.status(200).send(updated)
}


router.put('/update', validate(UpdateCourseSchema) ,withAsyncErrorHandler(updateCourse))

// Delete de um curso

const DeleteCourseSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
}

const deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id)

  await repository.get(id)

  await repository.del(id)
  res.status(204).send()
}

router.delete('/delete', validate(DeleteCourseSchema) ,withAsyncErrorHandler(deleteCourse))

// Acessar um curso 

const listCourses = async (_req, res) =>
  repository
    .list()
    .then(Courses => res.status(200).send({ Courses }))

const GetCourseSchema = {
  params: Joi.object({
    id: Joi.required(),
  }),
}

const getCourse = async (req, res) => {
  const id = req.params.id

  const course = await repository.get(id)

  res.status(200).send(course)
}

router.get('/',withAsyncErrorHandler(listCourses))
router.get('/:id', validate(GetCourseSchema) ,withAsyncErrorHandler(getCourse))

module.exports = router;