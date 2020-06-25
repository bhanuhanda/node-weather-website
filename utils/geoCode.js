const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmhhbnVoYW5kYSIsImEiOiJja2JsemdtMDYxZTdtMnRwajNxYmF5YWJiIn0.U3xsNPOUIGkdP3F5Tge3Jw&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. Try another location", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
