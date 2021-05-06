const { nextISSTimesForMyLocation } = require('./iss_promised');

const logTimes = function(times) {
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((times) => {
    logTimes(times);
  })
  .catch((error) => {
    console.log("Space station has crashed:", error.message);
  });
