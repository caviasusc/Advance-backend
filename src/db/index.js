const {Pool} = require('pg')

const pool = new Pool({
    host: 'ec2-52-22-161-59.compute-1.amazonaws.com',
    user: 'dwxqfcunfiwege',
    password: 'e1c12909d2368c82ad9cb240f2d95d326ce2546b7c7105ee27a2d9fc42816387',
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})

module.exports ={pool}