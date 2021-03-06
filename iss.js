const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      error = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error, null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      error = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(error, null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      error = `Status Code ${response.statusCode} when fetching pass times. Response: ${body}`;
      callback(error, null);
      return;
    }

    const times = JSON.parse(body).response;
    callback(null, times);
  });
};

//FINAL FUNCTION
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, times);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };

