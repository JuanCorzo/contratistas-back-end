/*Script : Crea la conexión con la base de datos de PostgreSQL
*/
const { Pool } = require('pg');
const { database } = require('./keys');
const { promisify }= require('util');
const pool = new Pool(database)

pool.connect((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }
  if (connection) connection.release();
  console.log('Database is conected');
  return;
});
// Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool;