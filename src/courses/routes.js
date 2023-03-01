const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const { coursesRepository } = require('./repository')
const repository = coursesRepository()

// Acessar um curso

const getJourney_Course = async (req, res) => {
  const journey_id = req.params.journey_id

  const courses = await repository.get(journey_id)
  

  res.status(200).send(courses)
}

router.get('/:journey_id' ,withAsyncErrorHandler(getJourney_Course))

module.exports = router;