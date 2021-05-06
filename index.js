const { nextISSTimesForMyLocation } = require('./iss');

const logTimes = function(times) {
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  logTimes(times);
});

