'use strict;'
const Forecast = require('../models/Weather.model');
const axios = require('axios');
const Cache = require('../helpers/WeatherCache')
let weatherCache = new Cache([]);
let weather = (req, res) => {
    try {
        if (weatherCache.weatherData.length !== 0 && weatherCache.timestamp == Date.now) {
            res.send(weatherCache.weatherData)
            console.log("cache")
        } else{
            let latValue = req.query.lat;
            let lonValue = req.query.lon;
            let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latValue}&lon=${lonValue}&key=${process.env.WEATHER_API_KEY}`

            axios.get(weatherUrl).then(item => {
                let weatherArr = item.data.data.map(city => {
                    return new Forecast(city);
                   
                })
                console.log("api")
                weatherCache.weatherData = weatherArr;
                weatherCache.timestamp=Date.now;
                res.send(weatherArr);

            })
        }
        // let searchQuery=weatherData.find(element =>{
        //     if(element.lat == latValue && element.lon == lonValue){
        //         console.log(1)
        //         return element;

        //     }
        // })
        // let forecaseArr = searchQuery.data.map(element =>{
        //     return new Forecast(element)
        // })

    } catch {
        res.send('Error: the information that you searched for it are not found')
    }


}

module.exports = weather

