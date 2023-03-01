const { Router } = require('express')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { journeysRepository } = require('./repository')
const repository = journeysRepository()

// Acessar uma Jornada

const listJourneys = async (_req, res) =>
  repository
    .list()
    .then(journeys => res.status(200).send( 
      journeys.map((elemento) => {
      return {
        id: elemento.id,
        name: elemento.title
      }
      })))

const GetJourneySchema = {
  params: Joi.object({
    id: Joi.required(),
  }),
}

const getJourney = async (req, res) => {
  const id = req.params.id

  const journey = await repository.get(id)

  res.status(200).send(journey)
}

router.get('/',withAsyncErrorHandler(listJourneys))
router.get('/:id', validate(GetJourneySchema) ,withAsyncErrorHandler(getJourney))

module.exports = router;