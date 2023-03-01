const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const { coursesRepository } = require('./repository')
const repository = coursesRepository()

// Acessar um curso

const getJourney_Course = async (req, res) => {
  const journey_id = req.params.journeyId

  const courses = await repository.get(journey_id)
  

  res.status(200).send(courses)
}

router.get('/:journeyId' ,withAsyncErrorHandler(getJourney_Course))

module.exports = router;