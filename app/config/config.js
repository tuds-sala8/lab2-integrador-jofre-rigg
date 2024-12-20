require('dotenv').config({ path: `.env_${process.env.NODE_ENV}` });   // Carga las variables de .env

module.exports = {
  development: {
    username: process.env.DB_USER_DEV || 'root',
    password: process.env.DB_PASS_DEV || '',
    database: process.env.DB_NAME_DEV || 'agenda_consultas_dev',
    host: process.env.DB_HOST_DEV || 'localhost',
    dialect: process.env.DB_DIALECT_DEV || 'mysql'
  },
  testing: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_DIALECT_TEST
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT_PROD || 'mysql'
  }
};
