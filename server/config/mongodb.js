/**
 * Handling getting our .env
 */
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env')})

/**
 * Necessary imports for connecting to our database
 */
const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

/**
 * make and close connection functions
 */
const makeConnection = async () => {
  const DB = process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DEV_DB
  try {
    console.log(`connecting to... ${process.env.MONGODB_URI}`)
    await mongoose
      .connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.MONGODB_URI}/${DB}`)
    console.log('successful connection to MongoDB')
  } catch (error) {
    console.log('error connecting to MongoDB: ', error)
  }
}

const closeConnection = async () => {
  try {
    await mongoose.connection.close()
  } catch (error) {
    console.log('error closing connection: ', error)
  }
}

module.exports = { makeConnection, closeConnection }
