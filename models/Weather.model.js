'use strict;'
class Forecast{
    constructor(obj){
        this.date=`Date: ${obj.valid_date}`
        this.description=`Description: Low of ${obj.low_temp}, high of ${obj.max_temp} with few ${obj.weather.description}`

    }

}
module.exports=Forecast;