const importApi = require("./importApi");

const http = require("http");

const hostname = "localhost";
const port = 3000;

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

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
    <p>data fra Fireball data API</p>
    <pre>${apiData}</pre>
  `;
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
