const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=e36ca30c5437abf9082cb07aff5b18e9";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to connect to the forecast services", undefined);
    } else if (body.cod !== 200) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        desc: body.weather[0].description,
        temp: body.main.temp,
      });
      //   const data = res.body;
      //   console.log(body.weather[0].description);
    }
  });
};

module.exports = forecast;
