const importApi = require("./importApi");
const syntaxHighlight = require("./syntaxHighlight");

const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer(async (req, res) => {
  let apiData = await importApi(); // typeof apiData === object

  apiData = JSON.stringify(apiData, null, 2);
  // apiData = JSON.stringify(apiData, null, "\t");

  apiData = syntaxHighlight(apiData);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  const html = `
    <style>
      body {
        background-color: #000;
        color: #fff;
      }
      pre {
        outline: 1px solid #ccc;
        padding: 5px;
        margin: 5px;
        background-color: #131313;
      }
      .string {
        color: green;
      }
      .number {
        color: darkorange;
      }
      .boolean {
        color: blue;
      }
      .null {
        color: magenta;
      }
      .key {
        color: red;
      }
    </style>
    <h1>API demo</h1>
    <p>data fra Fireball API</p>
    <pre>${apiData}</pre>
  `;
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
