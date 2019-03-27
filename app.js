const Express = require("express");
const { Game } = require("./src/gameOfLife.js");
const { getGame, renderHome, consoleReq,makeCellLive } = require("./handler.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = new Express();

app.game = new Game([[0, 1], [0, 1], [0, 2], [0, 2], [1, 4], [2, 2], [1, 2]], {
  topLeft: [0, 0],
  bottomRight: [20, 20]
});


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static("script/"));
app.use(consoleReq);


app.get("/", renderHome);
app.get("/getgame", getGame);

app.post("/makecelllive",makeCellLive);

module.exports = app;
