'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Takes any kind of value and returns the same value.
 * 
 * @param {Any data type} value - the value to be returned
 * 
 * @return {Any data type} value - the same value that is put in as a parameter
 */
 
 function identity(value) {
    return value;
}

module.exports.identity = identity;
 
/**
 * typeOf: Takes any kind of value and returns what type of value it is.
 * 
 * @param {Any data type} value - the value to find the type of
 * 
 * @return value - the type of the value the the value put in as a parameter is
 */
 
 function typeOf(value) {
    if (Array.isArray(value)) {
        return "array";
    } else if (value === null) {
        return "null";
    } else if (value instanceof Date) {
        return "date";
    } 
    return typeof value;
}

module.exports.typeOf = typeOf;
  
/**
 * first: Takes an array and finds the first n element(s) in that array.
 * 
 * @param {Array} array - the array to find the first element(s) of
 * @param {Number} n - the number of elements to find in the array. If n is undefined or not a number, the function will return the first element of the array.
 * 
 * @return {Any type of value} - array[0] - the first element in the array if n is not given
 * @return {Array} array.slice(0, n) - an array of the first n elements in the original array
 */
 
 function first(array, n) {
   if (!Array.isArray(array) || n < 0) {
       return [];
   } else if (n === undefined || isNaN(n)) {
       return array[0];
   }
   return array.slice(0, n);
}

module.exports.first = first;
 
/**
 * last: Takes an array and finds the last n element(s) in that array.
 * 
 * @param {Array} array - the array to find the element(s) of
 * @param {Number} n - the number of elements to find in the array. If n is undefined or not a number, the function will return the last element of the array.
 * 
 * @return {Any type of value} array[array.length - 1] - the last element in the array if n is not given
 * @return {Array} array - the whole original array, which is returned if n is greater than the entire length of the array
 * @return {Array} array.slice(n - 1) - an array of the last n elements in the original array
 */
 
 function last(array, n) {
    if (!Array.isArray(array) || n < 0) {
        return [];
    } else if (n === undefined || isNaN(n)) {
       return array[array.length - 1];
   } else if (n > array.length) {
       return array;
   }
   return array.slice(n - 1);
}

module.exports.last = last;
 
/**
 * each: Takes a collection, loops through the collection, and applies a function (condition) to the collection for each iteration of the loop.
 * 
 * @param {Array or Object} collection - the collection to loop through
 * @param {Function} funct - the function to be applied to each iteration of the loop.
 */
 
 function each(collection , funct) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      funct(collection[i], i, collection);
    }
  }
  else for (var key in collection) {
    funct(collection[key], key, collection);
  }
}

module.exports.each = each;

/**
 * indexOf: Takes an array and a value, and finds the index of the first instance of that value in the array.
 * 
 * @param {Array} array - the array to find the value in
 * @param {Any data type} value - the value to find the first index of in the array. If the value is not in the array, the function will return -1.
 * 
 * @return {Number} i - the index of the first instance of the value to look for in the array
 * @return {Number} -1 - returned if the value is not found in the array
 */
 
function indexOf(array, value) {
    for (var i = 0; i < array.length; i++){
        if (array[i] === value) {
            return i;
        } 
    }
    return -1;
}

module.exports.indexOf = indexOf;
 
/**
 * filter: Takes an array and a function (condition), applies the function to each element in the array, and then returns a new array containing the values in the old array that 
 * return true after the function is applied.
 * 
 * @param {Array} array - the original array to apply the function to each value of
 * @param {Function} funct - the function used to test each value in array
 * 
 * @return {Array} newArray - a new array that contains all the true values of the original array once the function is applied
 */
 
function filter(array, funct) {
var newArray = [];
    each(array, function(value, index, array) {
        if(funct(value, index, array)) {
        newArray.push(value);
        
      }
       });
  return newArray;
}

module.exports.filter = filter;

/**
 * reject: Takes an array and a function (condition), applies the function to each element in the array, and then returns a new array containing the values in the old array that
 * return false after the function is applied.
 * 
 * @param {Array} array - the original array to apply the function to each value of
 * @param {Function} funct - the function used to test each value in array
 * 
 * @return {Array} arrayFalse - a new array that contains all the values of the original array that return false once the function is applied
 */
 
function reject(array, funct) {
var arrayFalse = [];

    filter(array, function(value, index, array){
        if(!(funct(value, index, array))) {
            arrayFalse.push(value);
        }
    });
   return arrayFalse; 
}

module.exports.reject = reject;
 
/**
 * partition: Takes an array and a function (condition), applies the function to each element in the array, and returns two new arrays, one containing the values in the old array
 * that return truthy and one containing the values that return falsey after the function is applied.
 * 
 * @param {Array} array - the original array to apply the function to each value of
 * @param {Function} funct - the function used to test each value in array
 * 
 * @return {Array} newArray - a new array containing two arrays: one that has all the values from the original array that return true once the function is applied, and one that
 * has all the values from the original array that return false once the function is applied
 */
 
function partition(array, funct) {
var newArray = [];
var truthyArray = [];
var falseyArray = [];

    filter(array, function(value, index, array){
        if (funct(value, index, array)) {
            truthyArray.push(value);
        } else if (!(funct(value, index, array))) {
            falseyArray.push(value);
        }
    });
    
    newArray.push(truthyArray);
    newArray.push(falseyArray);
    return newArray;

}

module.exports.partition = partition;
 
/**
 * unique: Takes an array and returns a new array with all duplicates removed.
 * 
 * @param {Array} array - the array to remove the duplicates from
 * 
 * @return {Array} newArray - a new array containing all unique elements from the original array
 */
 
 function unique(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (i === indexOf(array, array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

module.exports.unique = unique;
 
/**
 * map: Takes a collection and a function, applies the function to each value in the collection, and returns a new array with the new values after the function is applied.
 * 
 * @param {Array or Object} collection - the collection to apply the function to each value of
 * @param {Function} funct - the function to apply to each element in the collection
 * 
 * @return {Array} newArray - a new array that contains all the values of the original collection after the function is applied
 */
 
function map(collection, funct) {
var newArray = [];
    if(Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++){
            newArray.push(funct(collection[i], i, collection));
        }
    }
    else {
        for (var key in collection) {
            newArray.push(funct(collection[key], key, collection));
        }
        
    }
return newArray;
}

module.exports.map = map;
 
/**
 * pluck: Takes an array of objects and a property (key) and returns the value of that property for every object in that array in a new array.
 * 
 * @param {Array} array - an array of objects to find the properties from
 * @param {String} prop - the property of each object in the array to find the values of
 * 
 * @return {Array} newArray - a new array that contains the values of the given property for every object in the original array
 */
 
function pluck(array, prop) {
var newArray = [];

    map(array, function(value, index, array) {
        newArray.push(array[index][prop]);
    });

return newArray;
}

module.exports.pluck = pluck;
 
/**
  * contains: Takes an array and a value, returns true if the array contains that value, and false if it does not.
  * 
  * @param {Array} array - the array to find the value in
  * @param {Any data type} value - the value to find in the 
  * 
  * @return {Boolean} array.indexOf(value) > -1 ? true : false - True or false; checks if the array contains the value or not
  */
  
 function contains(array, value) {
    return array.indexOf(value) > -1 ? true : false; 
}

module.exports.contains = contains;
  
/**
  * every: Takes a collection and a function. If all the values in the collection return true when the fuction is applied to each value, return true. If not, return false.
  * 
  * @param {Array or Object} collection - the collection to apply the function to each value of
  * @param {Function} funct - the function to test each value in. If no function is given, the values in the collection will be tested for truthiness
  * 
  * @return {Boolean} result - True or false for if all the values in the collection return true after the function is applied or if they are truthy if no function is given
  */
  
  function every(collection, funct) {
    var result = true;
    if (funct === undefined) {
        each(collection, function(value, index, collection) {
            if(!(collection[index])) {
                result = false;
            }
        });
    } else {
        each(collection, function(value, index, collection) {
            if (!(funct(value, index, collection))) {
              result = false;
            }
        });
    }

    return result;
}

module.exports.every = every;
  
/**
  * some: Takes a collection and a function. If at least one value in the collection returns true when the function is applied to each value, return true. If not, return false.
  * 
  * @param {Array or Object} collection - the collection to apply the function to each value of.
  * @param {Function} funct - the function to test each value in. If no function is given, the values in the collection will be tested for truthiness.
  * 
  * @return {Boolean} result - True or false for if at least one value in the collection is true after the function is applied or if at least one is truthy if no function is given
  */
  
function some(collection, funct) {
var result = false;
 if (funct === undefined) {
        each(collection, function(value, index, collection) {
            if(collection[index]) {
                result = true;
            }
        });
    }
    
    else {
        
    each(collection, function(value, index, collection) {
    if (funct(value, index, collection)) {
      result = true;
    }
  });
    }
return result;
}

module.exports.some = some;
  
/**
  * reduce: Takes an array, a function, and a seed. The function is what the previous value in the array does to the next value in the array. The seed is the value to start
  * looping at in the array.
  * 
  * @param {Array} array - the array to loop through and "reduce" with the function and the seed
  * @param {Function} funct - the function to determine how the array will be reduced
  * @param {Any data type} seed - where the array starts when being reduced
  * 
  * @return {Any data type} previous - the final value after each value in the array reduces one another according to the function
  */
  
function reduce(array, funct, seed) {
var previous;
var isSeed = true;

    if (seed === undefined) {
        previous = array[0];
        isSeed = false;
        
    }
    else {
        previous = seed;
    }
    

    each(array, function(value, index, array) {
        if (isSeed || index > 0) {
        previous = funct(previous, array[index], index); }
    });

return previous;
}
  
module.exports.reduce = reduce;
  
/**
  * extend: Takes one object and any number of other objects and copies the properties of the other object into the original object.
  * 
  * @param {Object} object1 - the original object to copy all the other objects into
  * 
  * @return {Object} object1 - the original object after the properties and values of all the other objects are copied into it
  */
  
function extend(object1) {
var args = arguments;
    each(args, function(value, i, args){
    if (i > 0) {
        each(args[i], function(val, key, obj) {
      object1[key] = val;
    });
    }
});
     
return object1;
   
}
  
module.exports.extend = extend;