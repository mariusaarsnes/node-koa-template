const Router = require("koa-router");
const dotenv = require("dotenv");
dotenv.config();
const API_VERSION = process.env.API_VERSION;
const router = new Router({ prefix: `/api/${API_VERSION}` });

console.log(API_VERSION);
//All Routes

router.get("/", ctx => {
  ctx.body = { msg: "Welcome to the API version 1" };
});

module.exports = router;
