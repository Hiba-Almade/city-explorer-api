const Movie = require('../models/Movie.model')
const axios=require('axios');
const Cache = require('../helpers/MovieCache')
let movieCache = new Cache([]);
let movie = (req, res) => { 
    try{
        if (movieCache.movieData.length !== 0 && movieCache.timestamp == Date.now) {
            res.send(movieCache.movieData)
            console.log("cache movie")
        } else{
    let cityname=req.query.cityname
    let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityname}&page=1`
    
    axios.get(movieUrl).then(item =>{

        let movieArr=item.data.results.map(movie =>{
            return new Movie(movie)
        })
        console.log("api movie")
        movieCache.movieData = movieArr;
        movieCache.timestamp=Date.now;
        res.send(movieArr);
    })
}
    }catch{
        res.send('Error: the information that you searched for it are not found')
    }

  
}
module.exports  = movie