const pg = require('pg');

// database pool options
const config = {
    database: 'toDoDB',
    host: 'localhost',
    max: 10,
    // database on port 5432
    port: 5432,
    // timeout after 30 seconds of no connection
    idleTimeoutMillis: 30000,
}

// create a pool instance for the koala database
const pool = new pg.Pool(config);

// give an indicator when connected to database
pool.on('connect', () => {
    console.log('Connected with To Do Database');
})

// handle database errors
pool.on('error', (err) => {
    console.error('Error with TO DO Database:', err);
})

module.exports = pool;