const request = require('request');

const geocode = (address,callback) => {

    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + address+ ".json?access_token=pk.eyJ1IjoicmljaGFzaHVrbGEiLCJhIjoiY2tjbmcyczlxMDI5azJ2cWtwcjA5aHIzNyJ9._FFZbSVfDWnbEJig_Gjyig&limit=1";
    
    request({url, json: true},(error,{ body }) => {
        if(error){
            callback('network issue',undefined);
        }else if(body.features.length == 0){
            callback('No weather report available for given place',undefined);
        }else{
            const data = body.features[0].center;
            const placeName = body.features[0].place_name;
            callback(undefined,{
                "placeName" : placeName,
                "longitude" : data[0],
                "Latitude": data[1]
            })
        }   
    })
}

module.exports = geocode