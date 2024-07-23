// start vanilla nodejs server:

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src-elem 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
  );

  if (req.url.toLowerCase().endsWith(".html")) {
    fs.readFile(path.join(__dirname, req.url), "utf8", (err, data) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(data);
      res.end();
    });
  } else if (req.url.toLowerCase().endsWith(".css")) {
    fs.readFile(path.join(__dirname, req.url), "utf8", (err, data) => {
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running, visit http://localhost:3000");
});
