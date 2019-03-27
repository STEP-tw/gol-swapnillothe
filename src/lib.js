const {
  isBetween,
  getAdjacentNumbers,
  contains,
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


module.exports = {
  getAllNeighbour,
  neighbourValidator,
  getValidNeighbour,
  willAlive,
}
