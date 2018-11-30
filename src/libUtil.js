const getAdjacentNumbers = function( num ){
  return [ num-1, num, num+1 ];
}

const increment = function( number=0 ){
  return ()=>number++;
}

const createNumberSeries = function( limit, startingNumber=0 ){
  let series = new Array( limit ).fill( "" );
  return series.map( increment( startingNumber ) );
}

const cycleGenerator = function( array, times){
  let index = 0;
  return ()=>array[(Math.floor((index++)/times))%array.length];
}

const isBetween = function( number1, number2, number3 ){
  return number1 <= number2 && number2 <= number3;
}

const rowGenerator = function( rowLength ){
  return ()=> new Array( rowLength ).fill(0);
}

const createGrid = function( row, column ){
  return createNumberSeries( row ).map( rowGenerator( column ) );
}

const contains = function( list, element ){
  return list.some(e=>e[0]===element[0] && e[1]===element[1]);
}

const zipArrays = function(set1,set2){
  let zippedArray = [];
  set1.map((x)=>{set2.map((y)=>{zippedArray.push([x,y]);});});
  return zippedArray;
}

module.exports = {
  getAdjacentNumbers,
  increment,
  createNumberSeries,
  cycleGenerator,
  rowGenerator,
  createGrid,
  isBetween,
  contains,
  zipArrays
}
