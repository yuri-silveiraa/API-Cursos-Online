require('dotenv').config()

const express = require('express')

const courses = require('./courses/routes')
const journeys = require('./journeys/routes')
const lessons = require('./lessons/routes')

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const erro = require('./middlewares/error')

const app = express()
const router = express.Router()

router.use(express.json())
router.use(logger())
router.use('/courses', courses)
router.use('/journeys', journeys)
router.use('/courses', lessons)

router.use(errorHandler())
router.use(erro())

app.use('/api', router)

app
  .listen(process.env.PORT, '0.0.0.0', () => {
    console.log('Server started')
  })
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })