const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const { journeysRepository } = require('./repository')
const repository = journeysRepository()

// Acessar uma Jornada

const listJourneys = async (_req, res) =>
  repository
    .list()
    .then(journeys => res.status(200).send(journeys))

const getJourney = async (req, res) => {
  const id = req.params.id

  const journey = await repository.get(id)

  res.status(200).send(journey)
}

router.get('/',withAsyncErrorHandler(listJourneys))
router.get('/:id' ,withAsyncErrorHandler(getJourney))

module.exports = router;