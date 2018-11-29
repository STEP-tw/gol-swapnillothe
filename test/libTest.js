const {
  getAllNeighbour,
  neighbourValidator,
  getValidNeighbour,
  willAlive,
  getWorld,
  getNextGeneration,
  getNthGeneration
} = require('../src/lib.js');

const { deepEqual, ok } = require('assert');
const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);
const isSame = (actualList,expectedList) => actualList.every(contains.bind(null,expectedList));
const isSameArity = (actualList,expectedList) => actualList.length == expectedList.length;

describe("getAllNeighbour",function() {
  it("should returns position of all 8 neighbours",function() {
    deepEqual( getAllNeighbour([ 2, 3 ] ), [ [ 1, 2 ], [ 1, 3 ],[ 1, 4 ], [ 2, 2 ], [ 2, 4 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ] ] );
  });
});

describe("neighbourValidator",function() {
  let isValidForZero = neighbourValidator({ topLeft : [ 0, 0 ], bottomRight : [ 3, 3 ] });
  it("should work for with topLeft [ 0, 0 ]",function() {
    deepEqual( isValidForZero( [ 2, 3 ] ), true );
    deepEqual( isValidForZero( [ 4, 3 ] ), false );
  });
  let isValid = neighbourValidator({ topLeft : [ 1, 1 ], bottomRight : [ 3, 3 ] });
  it("should work for with topLeft non zero elements array",function() {
    deepEqual( isValid( [ 2, 3 ] ), true );
    deepEqual( isValid( [ 0, 3 ] ), false );
  });
});

describe("getValidNeighbour",function() {
  it("should work for left corner cell",function() {
    deepEqual( getValidNeighbour({ topLeft : [ 0, 0 ], bottomRight : [ 3, 3 ] },[ 0, 0 ]),[[0,1],[1,0],[1,1]]);
  });
  it("should work for right corner cell",function() {
    deepEqual( getValidNeighbour({ topLeft : [ 0, 0 ], bottomRight : [ 3, 3 ] },[ 0, 3 ]),[[0,2],[1,2],[1,3]]);
  });
  it("should work for center corner cell",function() {
    deepEqual( getValidNeighbour({ topLeft : [ 1, 1 ], bottomRight : [ 3, 3 ] },[ 2, 2 ]),[[1,1],[1,2],[1,3],[2,1],[2,3],[3,1],[3,2],[3,3]]);
  });
});

describe("willAlive",function() {
  let currentGeneration1 = [[0,1],[1,1],[2,1]];
  let bounds1 = {topLeft: [0,0], bottomRight: [3,3]};

  it("should work for [0,0] topLeft",function() {
    deepEqual( willAlive(currentGeneration1, bounds1, [ 1, 0 ]), true );
    deepEqual( willAlive(currentGeneration1, bounds1, [ 1, 1 ]), true );
    deepEqual( willAlive(currentGeneration1, bounds1, [ 2, 0 ]), false );
  });

  let currentGeneration2 = [[0,1],[1,1],[2,1]];
  let bounds2 = {topLeft: [1,1], bottomRight: [3,3]};
  it("should work for other than [0,0] topLeft",function() {
    deepEqual( willAlive(currentGeneration2, bounds2, [ 1, 0 ]), false );
    deepEqual( willAlive(currentGeneration2, bounds2, [ 1, 1 ]), false );
    deepEqual( willAlive(currentGeneration2, bounds2, [ 2, 0 ]), false );
  });
});

describe("getWorld",function() {
  it("should works for start with [0,0] and square shape",function() {
    deepEqual( getWorld( [0,0],[1,1]),[[0,0],[0,1],[1,0],[1,1]]);
  });
  it("should works for start with other than [0,0] and square shape",function() {
    deepEqual( getWorld( [1,1],[2,2]),[[1,1],[1,2],[2,1],[2,2]]);
  });
  it("should works for start with [0,0] and rectangle shape",function() {
    deepEqual( getWorld( [0,0],[1,2]),[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]);
  });
  it("should works for start with other than [0,0] and rectangle shape",function() {
    deepEqual( getWorld( [1,1],[2,3]),[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3]]);
  });
});

describe('getNextGeneration',() => {
  it('should generate an empty generation for a current generation that contains only one live cell',() => {
    let currentGeneration = [[0,1]];
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = getNextGeneration(currentGeneration,bounds);
    deepEqual(actualNextGen,[]);
  });

  it('should generate a vertical blinker as the next step of a horizontal blinker',() => {
    let currentGeneration = [[0,1],[1,1],[2,1]];
    let expectedNextGen = [[1,0],[1,1],[1,2]]
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = getNextGeneration(currentGeneration,bounds);
    ok(isSame(actualNextGen,expectedNextGen));
    ok(isSameArity(actualNextGen,expectedNextGen));
  });

  it('should kill cells not within bounds',() => {
    let currentGeneration = [[0,1],[0,2],[0,3]];
    let expectedNextGen = []
    let bounds = {topLeft: [1,1], bottomRight: [3,3]};
    let actualNextGen = getNextGeneration(currentGeneration,bounds);
    ok(isSame(actualNextGen,expectedNextGen));
    ok(isSameArity(actualNextGen,expectedNextGen));
  });
});

describe("getNthGeneration",function() {
    let currentGeneration = [[0,1],[0,2],[0,3]];
    let expectedGen = []
    let bounds = {topLeft: [1,1], bottomRight: [3,3]};
  it("should work for current generation",function() {
    deepEqual( getNthGeneration( currentGeneration, bounds, 0 ),currentGeneration);
  });
});
