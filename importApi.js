function importApi() {
  const request = require("request");

  request(
    "https://ssd-api.jpl.nasa.gov/fireball.api?date-min=2020-02-15&req-loc=true",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body.data);
    }
  );
}
module.exports = importApi;
