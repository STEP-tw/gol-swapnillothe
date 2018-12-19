const { 
  getAdjacentNumbers,
  increment,
  createNumberSeries,
  rowGenerator,
  createGrid,
  isBetween,
  contains,
  zipArrays
} = require('../src/libUtil.js');

const { deepEqual } = require('assert');

describe("getAdjacentNumbers",function(){
  it("should work for zero value",function(){
    deepEqual( getAdjacentNumbers(0),[ -1, 0, 1 ]);
  });
  it("should work for non zero value",function(){
    deepEqual( getAdjacentNumbers(4),[ 3, 4, 5 ]);
  });
});

describe("increment",function() {
  let inc = increment();
  it("should work with no intializer",function() {
    deepEqual( inc(), 0 );
    deepEqual( inc(), 1 );
    deepEqual( inc(), 2 );
  });
  incr = increment(2);
  it("should work with intializer",function() {
    deepEqual( incr(), 2 );
    deepEqual( incr(), 3 );
    deepEqual( incr(), 4 );
  });
});

describe("createNumberSeries",function() {
  it("should return empty array with 0 length",function() {
    deepEqual( createNumberSeries( 0 ), [] );
  });
  it("should work with nonzero length",function() {
    deepEqual( createNumberSeries( 3 ),  [ 0, 1, 2 ] );
  });
  it("should work with nonzero length with intial value",function() {
    deepEqual( createNumberSeries( 3, 1 ),  [ 1, 2, 3 ] );
  });
});

describe("rowGenerator",function() {
  let createRowForZeroLength = rowGenerator( 0 );
  it("should return row of zero length ",function() {
    deepEqual( createRowForZeroLength( 0 ), [] );
  });
  let createRow = rowGenerator( 2 );
  it("should return positive integer length ",function() {
    deepEqual( createRow( 0 ), [ 0, 0 ] );
  });
});

describe("createGrid",function() {
  it("should return for all positive same row and column length",function() {
    deepEqual( createGrid( 1, 1 ),[ [ 0 ] ] );
    deepEqual( createGrid( 2, 2 ), [ [ 0, 0 ], [ 0, 0 ] ] );
  });
  it("should return for all positive different row and column length",function() {
    deepEqual( createGrid( 1, 2 ), [ [ 0, 0 ] ] );
    deepEqual( createGrid( 2, 3 ), [ [ 0, 0, 0 ], [ 0, 0, 0 ] ] );
  });
});

describe("isBetween",function() {
  it("should work for positive numbers",function() {
    deepEqual( isBetween( 1, 2, 3 ), true );
    deepEqual( isBetween( 4, 2, 3 ), false );
  });
  it("should work for negative numbers",function() {
    deepEqual( isBetween( -1, -2, -3 ), false );
    deepEqual( isBetween( -4, -3, -2 ), true );
  });
});

describe("contains",function() {
  it("should work",function() {
    deepEqual( contains( [ [ 1, 2 ], [ 2, 3 ] ], [ 2, 3 ] ), true );
    deepEqual( contains( [ [ 1, 2 ], [ 2, 3 ] ], [ 3, 3 ] ), false );
  });
});

describe("zipArrays",function() {
  it("should work for empty arrays",function() {
    deepEqual( zipArrays( [ [], [] ] ), [] );
  });
  it("should work for arrays with same arity",function() {
    deepEqual( zipArrays( [ [ 1, 2 ], [ 3, 4 ] ] ),[ [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ] ] );
  });
  it("should work for arrays with different arity",function() {
    deepEqual( zipArrays( [ [ 1, 2 ], [ 3 ] ] ),[ [ 1, 3 ], [ 2, 3 ] ] );
  });
});

