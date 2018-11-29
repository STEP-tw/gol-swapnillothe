const {
  getAllNeighbour,
  neighbourValidator,
  getValidNeighbour,
  willAlive,
  getWorld
} = require('../src/lib.js');

const { deepEqual } = require('assert');

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
