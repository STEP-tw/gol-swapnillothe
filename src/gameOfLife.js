const {
  createNumberSeries,
  zipArrays,
  contains,
  getAdjacentNumbers,
  isBetween
} = require("./libUtil.js");

class Game {
  constructor(cells, bounds) {
    this.cells = cells;
    this.bounds = bounds;
  }

  getWorld() {
    const topLeft = this.bounds["topLeft"];
    const bottomRight = this.bounds["bottomRight"];
    const leftCoOrdinate = bottomRight[0] - topLeft[0] + 1;
    const topCoOrdinate = bottomRight[1] - topLeft[1] + 1;
    const xCoOrdinates = createNumberSeries(leftCoOrdinate, topLeft[0]);
    const yCoOrdinates = createNumberSeries(topCoOrdinate, topLeft[1]);
    return zipArrays([xCoOrdinates, yCoOrdinates]);
  }

  nextGeneration() {
    const world = this.getWorld();
    const testingAliveness = this.willAlive.bind(this, this.cells, this.bounds);
    return world.filter(testingAliveness);
  }

  getNextGeneration() {
    this.cells = this.nextGeneration();
    return this.cells;
  }

  getCells() {
    return this.cells;
  }

  makeCellLive(cell) {
    this.cells.push(cell);
  }

  neighbourValidator(bounds, cell) {
    const { topLeft, bottomRight } = bounds;
    const isValid = isBetween(topLeft[0], cell[0], bottomRight[0]);
    return isValid && isBetween(topLeft[1], cell[1], bottomRight[1]);
  }

  getAllNeighbour(position) {
    let neighbours = zipArrays(position.map(getAdjacentNumbers));
    neighbours.splice(4, 1);
    return neighbours;
  }

  getValidNeighbour(bounds, position) {
    const isValid = this.neighbourValidator.bind(null, bounds);
    const neighbours = this.getAllNeighbour(position);
    if (bounds == Infinity) {
      return neighbours;
    }
    return neighbours.filter(isValid);
  }

  willAlive(previousState, bounds, cell) {
    const isAlive = contains.bind(this, previousState);
    const getValidNeighbours = this.getValidNeighbour.bind(this, bounds);
    const aliveConditions = { 3: true, 2: isAlive(cell), undefined: false };
    const aliveSubConditions = { 3: 3, 2: 2 };
    const aliveNeighboursNo = getValidNeighbours(cell).filter(isAlive).length;
    return aliveConditions[aliveSubConditions[aliveNeighboursNo]];
  }
}

module.exports = { Game };
