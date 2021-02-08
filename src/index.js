const express = require('express')
const bodypaser = require('body-parser')
const {pool} = require('./db/index')

const app = express();
app.use(bodypaser.urlencoded({extended:false}))
app.use(bodypaser.json())

//Routes
const empRoute = require('./routes/employee')

//cors
const cors = require('cors')
var cosrOptions = {
    origin: process.env.CORS_origins,
    optionSuccessStatus: 200
}

app.use(cors(cosrOptions));
app.use('/employee', empRoute)

app.get('/', (req, res) => {
    res.json({
        status: true,
        messsage: 'working'
    })
});

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})