require('dotenv').config()

const immutable = Object.freeze

const database = immutable({
    client: 'mysql2',
    connection: process.env.DB_URL,
    migrations: immutable({
      tableName: 'migrations',
  }) 
})

module.exports = immutable({
  database
})