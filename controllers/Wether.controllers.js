'use strict;'
const Forecast=require('../models/Weather.model');

let weather =(req, res)=> { 
    try{
       
    let latValue = req.query.lat;
    let lonValue = req.query.lon;
    let wetherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latValue}&lon=${lonValue}&key=${process.env.WEATHER_API_KEY}`
    
    axios.get(wetherUrl).then(item =>{

        let wetherArr=item.data.data.map(city =>{
            return new Forecast(city)
        })
        res.send(wetherArr);

    })
    // let searchQuery=weatherData.find(element =>{
    //     if(element.lat == latValue && element.lon == lonValue){
    //         console.log(1)
    //         return element;
           
    //     }
    // })
        // let forecaseArr = searchQuery.data.map(element =>{
        //     return new Forecast(element)
        // })
      
    }catch{
        res.send('Error: the information that you searched for it are not found')
    }

  
}

module.exports = weather

