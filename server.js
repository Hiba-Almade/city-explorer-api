const express = require('express') // require the express package
const cors = require('cors');
const axios=require('axios');
const weatherData = require('./data/weather.json');

const app = express() // initialize your express app instance
app.use(cors()) // after you initialize your express app instance
require('dotenv').config();
const PORT=process.env.PORT;


class Forecast{
    constructor(obj){
        this.date=`Date: ${obj.valid_date}`
        this.description=`Description: Low of ${obj.low_temp}, high of ${obj.max_temp} with few ${obj.weather.description}`

    }

}


// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

//localhost:3001/weather?cityname=<..>&lat=<..>&lon=<..>
app.get('/weather', 
 function (req, res) { 
    try{
     let cityValue= req.query.cityname;
    let latValue = Number(req.query.lat);
    let lonValue = Number(req.query.lon);
    let searchQuery=weatherData.find(element =>{
        if(element.city_name.toLowerCase() == cityValue.toLowerCase() || element.lat == latValue || element.lon == lonValue){
            console.log(1)
            return element;
           
        }
    })
        let forecaseArr = searchQuery.data.map(element =>{
            return new Forecast(element)
        })
        res.send(forecaseArr);
    }catch{
        res.send('Error: the information that you searched for it are not found')
    }

  
})

app.get('*', function (req, res) { 
  res.status(500).send('Some thing was wrong, data not found')
})

app.listen(PORT, () =>{
    console.log('server runing')
}) // kick start the express server to work