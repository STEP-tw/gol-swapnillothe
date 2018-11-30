const {
  isBetween,
  getAdjacentNumbers,
  cycleGenerator,
  contains,
  createNumberSeries,
  zipArrays
} = require('../src/libUtil.js');

const neighbourValidator = function( bounds, cell ){
    let isValid = isBetween(bounds["topLeft"][0],cell[0],bounds["bottomRight"][0]);
    return isValid && isBetween(bounds["topLeft"][1],cell[1],bounds["bottomRight"][1]);
}

const getAllNeighbour = function( position ){
  let neighbours = zipArrays( position.map( getAdjacentNumbers ) );
  neighbours.splice(4,1);
  return neighbours;
}

const getValidNeighbour = function(  bounds, position ){
  let isValid = neighbourValidator.bind( null, bounds );
  let neighbours = getAllNeighbour( position ).filter( isValid );
  return neighbours;
}

const willAlive = function( previousState, bounds, cell ){
  let isAlive = contains.bind( null, previousState );
  let getValidNeighbours = getValidNeighbour.bind( null, bounds );
  let aliveConditions = { 3 : true, 2 : isAlive( cell ), undefined : false };
  let aliveSubConditions = { 3 : 3, 2 : 2 };
  aliveNeighboursNo = getValidNeighbours( cell ).filter( isAlive ).length;
  return aliveConditions[ aliveSubConditions[ aliveNeighboursNo ] ];
}

const getWorld = function( ...size ){
  let noOfCells = (size[1][0]-size[0][0]+1)*(size[1][1]-size[0][1]+1);
  let cordinates = [ createNumberSeries((size[1][0]-size[0][0]+1),size[0][0]) ];
  cordinates[1] = createNumberSeries((size[1][1]-size[0][1]+1),size[0][1]);
  let world = new Array(noOfCells).fill("").map(x=>[]);
  let cycle1 = cycleGenerator(cordinates[0],cordinates[1].length);
  world = world.map(x=>{x.push(cycle1());return x});
  let cycle2 = cycleGenerator(cordinates[1],1);
  world = world.map(x=>{x.push(cycle2());return x});
  return world;
}

const getNextGeneration = function ( currentGeneration, bounds ){
  let world = getWorld( bounds["topLeft"], bounds["bottomRight"] );
  let testingAliveness = willAlive.bind( null, currentGeneration, bounds );
  return world.filter( testingAliveness );
}

const getNthGeneration = function( currentGen, bounds, genIndex ){
  for( let index = 0; index < genIndex; index++ ){
    let nextGen = getNextGeneration( currentGen, bounds );
    currentGen = nextGen;
  }
  return currentGen;
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
