const getGame = function(req, res) {
  const game = req.app.game;
  game.getNextGeneration();
  res.send(JSON.stringify(game));
};

const renderHome = function(req, res) {
  res.redirect("/index.html");
};

const consoleReq = function(req, res, next) {
  console.log(req.url, "this is req");
  next();
};

const makeCellLive = function(req, res) {
  const { cell } = req.body;
  const game = req.app.game;
  game.makeCellLive(cell);
  res.end();
};

module.exports = {
  getGame,
  renderHome,
  consoleReq,
  makeCellLive
};
