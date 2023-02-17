const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const { coursesRepository } = require('./repository/index')


// Criar um curso 
const createCourse = async (req, res) =>{
    const course = req.body
    const inserted = await coursesRepository.insert(course)
  
    res
      .status(201)
      .header('Location', `/courses/${inserted.id}`)
      .send(inserted)
  }

router.post('/create', withAsyncErrorHandler(createCourse))

// Update de um curso

router.put('/update', async (req, res) =>{

})