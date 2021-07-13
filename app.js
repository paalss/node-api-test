const importApi = require("./importApi");
require("dotenv").config();

const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer(async (req, res) => {
  let apiData = await importApi();
  // console.log(apiData.body.url);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let media;
  // console.log(apiData.body.media_type);
  if (apiData.body.media_type === "image") {
    media = `<img src=${apiData.body.url} alt="" />`;
  } else {
    media = `
      <video>
        <source src="${apiData.body.url}" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <br />
      <b>Ressurser om loade gltf. (Gltf faller innenfor video media_type)</b>
      <a href="https://threejs.org/examples/">https://threejs.org/examples/</a>
      <a href="https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html">https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html</a>
      <a href="https://stackoverflow.com/questions/66622131/add-video-player-to-a-glb-model-with-controls">https://stackoverflow.com/questions/66622131/add-video-player-to-a-glb-model-with-controls</a>
    `;
  }

  const html = `<style>
  body {
    background-color: #131313;
    color: #fff;
  }
  p {
    line-height: 1.8rem;
  }
  .container {
    margin: 0 auto;
    width: 90%;
    max-width: 500px;
  }
  img {
    width: 100%;
  }
  figure {
    margin: 0;
    padding: 15px;
    background-color: #000;
  }
</style>
<div class="container">
  <h1>API demo</h1>
  <p>
    Astronomy Picture of the Day (APOD) microservice
    <br />
    <a href="https://api.nasa.gov/">https://api.nasa.gov/</a>
  </p>
  <figure>
    ${media}
    <caption>
      <h2>${apiData.body.title}</h2>
      <p>
        ${apiData.body.copyright} <br />
        <a href="${apiData.body.url}">${apiData.body.url}</a>
      </p>
    </caption>
  </figure>
  <p>${apiData.body.explanation}</p>
</div>
`;
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
