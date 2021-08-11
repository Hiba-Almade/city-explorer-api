const Movie = require('../models/Movie.model')
let movie = (req, res) => { 
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

  
}
module.exports  = movie