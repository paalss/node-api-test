const importApi = require("./importApi");

const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer(async (req, res) => {
  let apiData = await importApi();

  console.log(typeof apiData);
  apiData = JSON.stringify(apiData, null, 2);
  // apiData = JSON.stringify(apiData, null, "\t");

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  const html = `
    <h1>API demo</h1>
    <p>data fra Fireball data API</p>
    <pre>${apiData}</pre>
  `;
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
