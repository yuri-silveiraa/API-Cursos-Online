const { readFileSync } = require('fs')
const { join } = require('path')

const { load: loadYaml } = require('js-yaml')

const immutable = Object.freeze
/*
const loadOpenApiJson = () => {
  const openApiPath = join(__dirname, '..', '..', 'docs', 'openapi.yml')
  const openApiFileContent = readFileSync(openApiPath)
  return loadYaml(openApiFileContent)
} 

const swagger = immutable({
  document: loadOpenApiJson(),
  options: immutable({
    explorer: false,
  }),
})*/

const jwt = immutable({
  secret: 'shhhh',
  expiration: '4h',
  audience: 'urn:api:client',
  issuer: 'urn:api:issuer',
})

const encryption = {
  salt: 'salt',
  iterations: 100000,
  keyLength: 64,
  digest: 'sha512'
}

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
  database,
  jwt,
  encryption
})