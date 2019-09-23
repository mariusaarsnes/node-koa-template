const Koa = require("koa");
const dotenv = require("dotenv");
const router = require("./router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const https = require("https");
const http = require("http");

dotenv.config();

const app = new Koa();
const HOST = process.env.HOST;
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

// Add Middleware
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

// Custom Error Handler
app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});

http.createServer(app.callback()).listen(HTTP_PORT, HOST, listeningReporter);
https.createServer(app.callback()).listen(HTTPS_PORT, HOST, listeningReporter);

function listeningReporter() {
  const { address, port } = this.address();
  const protocol = this.addContext ? "https" : "http";
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}
