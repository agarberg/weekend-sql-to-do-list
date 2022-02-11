const pg = require('pg');

// database pool options
let poolOptions = {
    database: 'koalas',
    host: 'localhost',
    max: 10,
    // database on port 5432
    port: 5432,
    // timeout after 30 seconds of no connection
    idleTimeoutMillis: 30_000,
}

// create a pool instance for the koala database
const koalaPool = new pg.Pool(poolOptions);

// give an indicator when connected to database
koalaPool.on('connect', () => {
    console.log('Connected to Koalas Database');
})

// handle database errors
koalaPool.on('error', (err) => {
    console.error('Error with Koalas Database:', err);
})

module.exports = koalaPool;