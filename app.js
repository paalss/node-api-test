const importApi = require("./importApi");

const http = require("http");

const hostname = "localhost";
const port = 3000;

importApi();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  const html = `
    <h1>eeeeee</h1>
    <p>qqqqqqqeeeeee</p>
  `;
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
