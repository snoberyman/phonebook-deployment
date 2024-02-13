const express = require('express')
const phonebookRouter = express.Router()

/**
 * SERVER DATA
 */
let phonebook = 
[
  { id: 1, name: 'Arto Hellas', number: '604-234-2195', favourite: true },
  { id: 2, name: 'Johann Velo', number: '604-220-6792', favourite: false },
  { id: 3, name: 'Isaiah Wood', number: '604-778-2012', favourite: false }
]

/**
 * @receives a GET request to the URL: http://localhost:3001/api/phonebook/about
 * @returns a basic message
 */
phonebookRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for persons router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/phonebook
 * @returns bulk persons list as a JSON
 */
phonebookRouter.get('/', async (request, response) => {
  response.json(phonebook)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/phonebook/:id
 * @returns a specific person (entry)
 */
phonebookRouter.get('/:id', async (request, response) => {
  const id = Number(request.params.id)
  const findEntry = phonebook.find(entry => entry.id == id)
  response.json(findEntry)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/phonebook
 * @returns the newly created person (entry)
 */
phonebookRouter.post('/', async (request, response) => {
  // Get body & fields
  const body = request.body
  const name = body.name
  const number = body.number
  // Error handling
  if (!body || !name || !number) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  // Create new entry
  const newEntry = {
    id: phonebook.length + 1,
    name,
    number,
    favourite: false
  }
  // Update phonebook and return resource
  phonebook = phonebook.concat(newEntry)
  response.status(201).send(newEntry)
})

/**
 * @receives a PUT request to the URL: http://localhost:3001/api/phonebook/:id
 * @returns an appropriate status code
 */
phonebookRouter.put('/:id', async (request, response) => {
  const id = Number(request.params.id)
  // Update existing entry
  phonebook = phonebook
    .map(entry => entry.id === id ? {...entry, favourite: !entry.favourite } : entry)
  response.status(200).send()
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/phonebook/:id
 * @returns an appropriate status code
 */
phonebookRouter.delete('/:id', async (request, response) => {
  const id = Number(request.params.id)
  // Delete entry
  phonebook = phonebook.filter(entry => entry.id !== id)
  response.status(200).send()
})

module.exports = phonebookRouter