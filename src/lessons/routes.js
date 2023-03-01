const { Router } = require('express')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { journeysRepository } = require('./repository')
const repository = journeysRepository()

// acessar um journey_course 

const listJourneys_courses = async (_req, res) =>
  repository
    .list()
    .then(Journeys_courses => res.status(200).send({ Journeys_courses }))

const GetJourneySchema = {
  params: Joi.object({
    id: Joi.required(),
  }),
}

const getjourney_course = async (req, res) => {
  const id = req.params.id

  const journey = await repository.get(id)

  res.status(200).send(journey)
}

router.get('/',withAsyncErrorHandler(listJourneys_courses))
router.get('/:id', validate(GetJourneySchema) ,withAsyncErrorHandler(getjourney_course))

module.exports = router;