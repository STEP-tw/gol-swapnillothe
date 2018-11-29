const getAdjacentNumbers = function( num ){
  return [ num-1, num, num+1 ];
}

exports.getAdjacentNumbers = getAdjacentNumbers;

const increment = function( number=0 ){
  return function(){
    return number++;
  }
}

const createNumberSeries = function(limit, startingNumber=0){
  let series = new Array(limit).fill("");
  createSeries = increment( startingNumber );
  return series.map(createSeries);
}

exports.increment = increment;
exports.createNumberSeries = createNumberSeries;

const cycleGenerator = function(array,times){
  let index = 0;
  return function(){
    let i = Math.floor((index++)/times);
    return array[i%array.length];
  }
}

exports.cycleGenerator = cycleGenerator;

const isBetween = function( number1, number2, number3 ){
  return number1 <= number2 && number2 <= number3;
}

exports.isBetween = isBetween;

const rowGenerator = function( rowLength ){
  return function( rowNumber ){
    let row = new Array( rowLength ).fill(0);
    return row;
  }
}

exports.rowGenerator = rowGenerator;

const createGrid = function( row, column ){
  let createRow = rowGenerator( column );
  let grid = createNumberSeries( row );
  return grid.map(createRow);
}

exports.createGrid = createGrid;

const contains = function( list, element ){
  return list.some(e=>e[0]===element[0] && e[1]===element[1]);
}

exports.contains = contains;
