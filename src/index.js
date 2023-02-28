const express = require('express')


const courses = require('./courses/routes')
const journeys = require('./journeys/routes')


//const docs = require('./middlewares/docs')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const app = express()
const router = express.Router()

router.use(express.json())
router.use(logger())
router.use('/courses', courses)
router.use('/journeys', journeys)


router.use(errorHandler())

app.use('/api', router)
//app.use('/docs', docs)

app
  .listen(3000, '0.0.0.0', () => {
    console.log('Server started')
  })
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })