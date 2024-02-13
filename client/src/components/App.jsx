import { useState } from 'react'

/**
 * Import components needed
 */
import Persons from './Persons'
import ContactForm from './ContactForm'

const App = () => {
  const [persons, setPersons] = useState(
  [
    { id: 1, name: 'Arto Hellas', number: '604-234-2195', favourite: true },
    { id: 2, name: 'Johann Velo', number: '604-220-6792', favourite: false },
    { id: 3, name: 'Isaiah Wood', number: '604-778-2012', favourite: false }
  ])
  
  /**
   * Adds a contact, by default, not favourited
   * @param {Event} e 
   */
  const handleAdd = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const number = e.target.number.value
    const newContact = {
      id: persons.length + 1,
      name,
      number,
      favourite: false
    }
    setPersons(persons.concat(newContact))
    // Update fields
    e.target.name.value = ''
    e.target.number.value = ''
  }

  /**
   * Removes a contact according to id
   * @param {Event} e 
   * @param {number} id 
   */
  const handleDelete = (e, id) => {
    e.preventDefault()
    const newPersons = persons.filter(person => person.id !== id)
    setPersons(newPersons)
  }

  /**
   * Updates a contact's favourite status
   * @param {Event} e 
   * @param {number} id 
   */
  const handleUpdate = (e, id) => {
    e.preventDefault()
    const newPersons = persons
      .map(person => person.id == id 
        ? {...person, favourite: !person.favourite} 
        : person)
    setPersons(newPersons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>favourites</h2>
        <Persons persons={persons} favouriteOnly={true} onDelete={handleDelete} onUpdate={handleUpdate} />
      <h2>contacts</h2>
        <Persons persons={persons} favouriteOnly={false} onDelete={handleDelete} onUpdate={handleUpdate} />
      <ContactForm onAdd={handleAdd} />
    </div>
  )
}

export default App
