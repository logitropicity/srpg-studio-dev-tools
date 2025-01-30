// correctly calculates the modulus for negative numbers
// https://stackoverflow.com/a/1082938
function mod(a, b) {
    return ((a % b) + b) % b;
}


/**
 * In-place concatentation of multiple arrays onto the first.
 */
function pushes(array) {
    for (var i = 1; i < arguments.length; i++) {
        Array.prototype.push.apply(array, arguments[i]);
    }
    return array;
}


// Durstenfeld shuffle
// https://stackoverflow.com/a/12646864
function shuffle(array) {
    array = array.slice(0);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/**
 * Keeps the number x bounded so min <= x <= max
 */
function bounded(min, max, x) {
    return Math.max(min, Math.min(max, x));
}
