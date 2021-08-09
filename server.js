const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const axios=require('axios');
const data = require('./data/weather.json');
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

//localhost:3000/weather?lat=<..>&lon=<..>
app.get('/weather', 
 function (req, res) { 
    let latValue= req.query.lat;
    let lonValue=req.query.lon;
    let item=data.find(element =>{
        console.log("inside", latValue , lonValue)
        if(element.lat == latValue && element.lon == lonValue){
            console.log(1)
            return element.city_name;
           
        } else {
            console.log(2)
            return "city not found";
        }
    })
    res.send(item);
})
 
app.listen(process.env.PORT, () =>{
    console.log('server runing')
}) // kick start the express server to work