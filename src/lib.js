const {
  isBetween,
  getAdjacentNumbers,
  cycleGenerator,
  contains,
  createNumberSeries
} = require('../src/libUtil.js');

const neighbourValidator = function( bounds ){
  return function( cell ){
    let isValid = isBetween(bounds["topLeft"][0],cell[0],bounds["bottomRight"][0]);
    return isValid && isBetween(bounds["topLeft"][1],cell[1],bounds["bottomRight"][1]);
  }
}

exports.neighbourValidator = neighbourValidator;

const getAllNeighbour = function( position ){
  let neighbours = new Array(9).fill("").map(x=>[]);
  let adjcentNumbers = position.map(getAdjacentNumbers);

  let cycle = cycleGenerator(adjcentNumbers[0],3);
  neighbours = neighbours.map(function(x) {x.push(cycle()); return x;});
  cycle = cycleGenerator(adjcentNumbers[1],1);
  neighbours = neighbours.map(function(x) {x.push(cycle()); return x;});
  neighbours.splice(4,1);

  return neighbours;
}

exports.getAllNeighbour = getAllNeighbour;

const getValidNeighbour = function(  bounds, position ){
  let isValid = neighbourValidator( bounds );
  let neighbours = getAllNeighbour( position ).filter( isValid );
  return neighbours;
}

exports.getValidNeighbour = getValidNeighbour;

const willAlive = function( previousState, bounds, cell ){
  let isAlive = contains.bind( null, previousState );
  let getValidNeighbours = getValidNeighbour.bind( null, bounds );
  let aliveConditions = { 3 : true, 2 : isAlive( cell ), undefined : false };
  let aliveSubConditions = { 3 : 3, 2 : 2 };
  aliveNeighboursNo = getValidNeighbours( cell ).filter( isAlive ).length;
  return aliveConditions[ aliveSubConditions[ aliveNeighboursNo ] ];
}

exports.willAlive = willAlive;


const getWorld = function( ...size ){
  let cordinates = [];
  let noOfCells = (size[1][0]-size[0][0]+1)*(size[1][1]-size[0][1]+1);
  cordinates[0] = createNumberSeries((size[1][0]-size[0][0]+1),size[0][0]);
  cordinates[1] = createNumberSeries((size[1][1]-size[0][1]+1),size[0][1]);
  let world = new Array(noOfCells).fill("").map(x=>[]);
  let cycle1 = cycleGenerator(cordinates[0],cordinates[1].length);
  world = world.map(x=>{x.push(cycle1());return x});
  let cycle2 = cycleGenerator(cordinates[1],1);
  world = world.map(x=>{x.push(cycle2());return x});
  return world;
}

exports.getWorld = getWorld;
