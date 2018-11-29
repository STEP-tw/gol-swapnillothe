const { getNextGeneration } = require('./lib.js');
const nextGeneration = function(currGeneration,bounds) {
  return getNextGeneration( currGeneration, bounds );
}

module.exports = { nextGeneration };
