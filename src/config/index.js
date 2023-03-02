
const immutable = Object.freeze

const database = immutable({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'staart',
    password: 'staart',
    database: 'Cursos',
  },
  migrations: immutable({
    tableName: 'migrations',
  })
})

module.exports = immutable({
  database
})