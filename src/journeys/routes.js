const { Router } = require('express')
const Joi = require('joi')

const withAsyncErrorHandler = require('../middlewares/async-error')
const validate = require('../middlewares/validate')

const router = Router()

const { journeysRepository } = require('./repository')
const repository = journeysRepository()

// Criar um curso 

const CreateJouneySchema = {
  body: Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required(),
    thumb: Joi.string().required(),
    description: Joi.string().max(1000),
    slug: Joi.string().required(),
  })
}

const createJourney = async (req, res) =>{
    const journey = req.body
    
    const inserted = await repository.insert(journey)
    console.log(inserted)
    const location = `api/journey/${inserted.id}`
    res
      .status(201)
      .header('Location', location)
      .send(inserted)
      
  }

router.post('/', validate(CreateJouneySchema) ,withAsyncErrorHandler(createJourney))

// Update de um curso

const UpdateJouneySchema = {
  params: Joi.object({
    id: Joi.required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required(),
    thumb: Joi.string().required(),
    description: Joi.string().max(1000),
    slug: Joi.string().required(),
  })
}

const updateJourney = async (req, res) => {
  const id = req.params.id

  const body = req.body

  const registered = await repository.get(id)

  const journey = { ...registered, ...body, id }
  const updated = await repository.update(journey)
  res.status(200).send(updated)
}


router.put('/:id', validate(UpdateJouneySchema) ,withAsyncErrorHandler(updateJourney))

// Delete de um curso

const DeleteJourneySchema = {
  params: Joi.object({
    id: Joi.required(),
  }),
}

const deleteJourney = async (req, res) => {
  const id = req.params.id

  await repository.get(id)

  await repository.del(id)
  res.status(204).send()
}

router.delete('/:id', validate(DeleteJourneySchema) ,withAsyncErrorHandler(deleteJourney))

// Acessar um curso 

const listJourneys = async (_req, res) =>
  repository
    .list()
    .then(Journeys => res.status(200).send({ Journeys }))

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