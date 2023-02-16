const path = require('node:path');

module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'staart',
    password: 'staart',
    database: 'Cursos',
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
};
