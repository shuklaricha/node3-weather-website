const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0bc35bcad45ede87acd1d423e6772550&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";
  request({ url, json: true }, (error, { body}) => {
    if (error) {
      callback("Network Issues", undefined);
    } else if (body.error) {
      callback("Coordiantes are wrong!!", undefined);
    } else {
      const data = body.current;
      callback(undefined, {
        weatherDesription: data.weather_descriptions[0],
        temperature: data.temperature,
        feelsLike: data.feelslike,
        observationTime: data.observation_time,
      });
      //   console.log(data.weather_descriptions[0] + ` It is Currently `+ data.temperature +' out. It feels like '+ data.feelslike + ' out.');
    }
  });
};

module.exports =forecast