require('dotenv').config()

module.exports = { 
    development: {
      client: 'mysql2',
      connection: {
        database: process.env.DB_URL,
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'migrations'
      }
    },
  }

