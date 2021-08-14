const express = require('express') // require the express package
const cors = require('cors');
const axios=require('axios');
//const weatherData = require('./data/weather.json');


const app = express() // initialize your express app instance
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const PORT=process.env.PORT;

let weather = require('./controllers/Wether.controllers')
let movie= require('./controllers/Movie.controllers')

// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

//localhost:3001/weather?lat=<..>&lon=<..>
app.get('/weather', weather )

//localhost:3001/movies?cityname=<..>
app.get('/movies', movie)



app.get('*', function (req, res) { 
  res.status(500).send('Some thing was wrong, data not found')
})

app.listen(PORT, () =>{
    console.log('server runing')
}) // kick start the express server to work