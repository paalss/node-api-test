function importApi() {
  const https = require("https");

  https
    .get(
      "https://ssd-api.jpl.nasa.gov/fireball.api?date-min=2020-02-15&req-loc=true",
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log(JSON.parse(data));
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
module.exports = importApi;
