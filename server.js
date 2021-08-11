const express = require('express') // require the express package
const cors = require('cors');
const axios=require('axios');
//const weatherData = require('./data/weather.json');


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

class Movie{
    
    constructor(obj){
        this.baseImgUrl = 'https://image.tmdb.org/t/p/w500'
        this.title = obj.title
        this.overview = obj.overview
        this.avgVote=obj.vote_average
        this.totalVote=obj.vote_count
        this.img=this.baseImgUrl+obj.poster_path
        this.pop=obj.popularity
        this.released=obj.release_date
    }
    
}


// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

//localhost:3001/weather?lat=<..>&lon=<..>
app.get('/weather', 
 function (req, res) { 
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

  
})

//localhost:3001/movies?cityname=<..>
app.get('/movies', 
 function (req, res) { 
    try{
    let cityname=req.query.cityname
    let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityname}&page=1`
    
    axios.get(movieUrl).then(item =>{

        let movieArr=item.data.results.map(movie =>{
            return new Movie(movie)
        })
        res.send(movieArr);
        

    })
   
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