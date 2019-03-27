const Express = require("express");
const{ getNextGeneration,renderHome} = require("./handler.js");
const app = new Express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/",renderHome);
app.post("/getnextgen",getNextGeneration);
app.use(Express.static("gameOfLife/"));
module.exports = app;