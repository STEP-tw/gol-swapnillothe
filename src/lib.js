const {
  isBetween,
  getAdjacentNumbers,
  cycleGenerator,
  contains,
  createNumberSeries,
  zipArrays
} = require('./libUtil.js');

const neighbourValidator = function( bounds, cell ){
  let { topLeft, bottomRight } = bounds;
  let isValid = isBetween( topLeft[0], cell[0], bottomRight[0] );
  return isValid && isBetween( topLeft[1], cell[1], bottomRight[1] );
}

const getAllNeighbour = function( position ){
  let neighbours = zipArrays( position.map( getAdjacentNumbers ) );
  neighbours.splice(4,1);
  return neighbours;
}

const getValidNeighbour = function(  bounds, position ){
  let isValid = neighbourValidator.bind( null, bounds );
  let neighbours = getAllNeighbour( position );
  if( bounds==Infinity ){ return neighbours };
  return neighbours.filter( isValid );
}

const willAlive = function( previousState, bounds, cell ){
  let isAlive = contains.bind( null, previousState );
  let getValidNeighbours = getValidNeighbour.bind( null, bounds );
  let aliveConditions = { 3 : true, 2 : isAlive( cell ), undefined : false };
  let aliveSubConditions = { 3 : 3, 2 : 2 };
  let aliveNeighboursNo = getValidNeighbours( cell ).filter( isAlive ).length;
  return aliveConditions[ aliveSubConditions[ aliveNeighboursNo ] ];
}

const getWorld = function( ...size ){
  let xCoOrdinates = createNumberSeries( (size[1][0]-size[0][0]+1), size[0][0] );
  let yCoOrdinates = createNumberSeries( (size[1][1]-size[0][1]+1), size[0][1] );
  return zipArrays( [ xCoOrdinates, yCoOrdinates ] );
}

const getNextGeneration = function ( currentGeneration, bounds ){
  let { topLeft, bottomRight } = bounds;
  let world = getWorld( topLeft, bottomRight );
  let testingAliveness = willAlive.bind( null, currentGeneration, bounds );
  return world.filter( testingAliveness );
}

const getNthGeneration = function( currentGeneration, bounds, n ){
  for( let index = 0; index < n; index++ ){
    currentGeneration = getNextGeneration( currentGeneration, bounds );
  }
  return currentGeneration;
}

module.exports = {
  getAllNeighbour,
  neighbourValidator,
  getValidNeighbour,
  willAlive,
  getWorld,
  getNextGeneration,
  getNthGeneration
}
