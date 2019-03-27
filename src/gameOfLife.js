const { nextGeneration } = require("./lib.js");

class Game {
  constructor(cells, bounds) {
    this.cells = cells;
    this.bounds = bounds;
  }

  getNextGeneration() {
    this.cells = nextGeneration(this.cells, this.bounds);
    return this.cells;
  }

  getCells() {
    return this.cells;
  }

  makeCellLive(cell) {
    this.cells.push(cell);
  }
}

module.exports = { nextGeneration, Game };
