'use strict;'
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
module.exports=Movie;