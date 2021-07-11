function importApi() {
  const got = require("got");

  return (async () => {
    try {
      const response = await got(
        "https://ssd-api.jpl.nasa.gov/fireball.api?date-min=2020-02-15&req-loc=true",
        { json: true }
      );
      // console.log(response.body.data[0]);
      return response.body.data[0];
    } catch (error) {
      console.log(error.response.body);
    }
  })();
}
module.exports = importApi;
