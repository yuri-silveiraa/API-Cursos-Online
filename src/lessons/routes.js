const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const { lessonsRepository } = require('./repository')
const repository = lessonsRepository()

// acessar uma lesson 

const getLessons = async (req, res) => {
  const id = req.params.courseId
  const journey = await repository.get(id)

  res.status(200).send(journey)
}

router.get('/:courseId/lessons' ,withAsyncErrorHandler(getLessons))

module.exports = router;