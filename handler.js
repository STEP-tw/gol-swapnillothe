const { nextGeneration } = require("./src/gameOfLife.js");

const getNextGeneration = function(req, res) {
  const cells  = req.body;
  const nextGenerationCells = nextGeneration(cells,{topLeft: [0,0], bottomRight: [100,100]});
  const nextGenerationCell =  JSON.stringify(nextGenerationCells);
  res.send(nextGenerationCell);
};

const renderHome = function(req, res) {
  res.redirect("/index.html");
};
module.exports = {
  getNextGeneration,
  renderHome
};
