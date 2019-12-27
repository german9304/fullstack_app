/**
 * Connection setup for PostgreSQL database
 */

const pgp = require('pg-promise');

// Connection options for database
const CONNECTION_OPTIONS = {
  host: 'db',
  port: '5432',
  database: 'mydb',
  user: 'german',
  password: 'password123456'
};

const PGP_DB = pgp();
const DB = PGP_DB(CONNECTION_OPTIONS);
module.exports = {
  DB,
  PGP_DB
};
