function importApi() {
  const got = require("got");

  return (async () => {
    try {
      const response = await got(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`,
        { json: true }
      );
      // console.log(response.body.url);
      // console.log(response.body.explanation);
      return response;
    } catch (error) {
      console.log(error.response.body);
    }
  })();
}
module.exports = importApi;
