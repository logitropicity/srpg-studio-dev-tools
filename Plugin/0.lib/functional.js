/**
 * A functional synonym for dot or bracket notation.
 * See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
 */
function accessor(obj) {
    return function(property) {
        return obj[property];
    };
}


/**
 * Used to avoid naming function aliases.
 */
function wrap(func, wrappingFunc) {
    return wrappingFunc(func);
}


/**
 * Creates a constructor (class) function from other constructor(s) and a prototype.
 * This implements very simple inheritance and enables limited type checking.
 */
function inherit() {
    var defn = arguments[arguments.length - 1];
    var constructor = defn.constructor;

    var classes = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    classes.push({ prototype: defn });

    for (var i = 0; i < classes.length; i++) {
        Object.assign(constructor.prototype, classes[i].prototype);
    }
    return constructor;
}


/**
 * Mimics lodash's pipe
 */
function pipe() {
    var fns = arguments;
    return function() {
        var out = fns[0].apply(this, arguments);
        for (var i = 1; i < fns.length; i++) {
            out = fns[i].call(this, out);
        }
        return out;
    };
}


/**
 * Mimics funcy's project
 * Caveats apply - see the README
 */
function project(obj, array) {
    if (!Array.prototype.isPrototypeOf(array)) {
        array = Object.keys(array);
    }

    var out = {};
    for (var i = 0; i < array.length; i++) {
        var property = array[i];
        if (obj.propertyIsEnumerable(property)) {
            out[property] = obj[property];
        }
    }
    return out;
}


/**
 * Mimics funcy's omit
 * Caveats apply - see the README
 */
function omit(obj, array) {
    if (!Array.prototype.isPrototypeOf(array)) {
        array = Object.keys(array);
    }

    var out = Object.assign({}, obj);
    for (var i = 0; i < array.length; i++) {
        delete out[array[i]];
    }
    return out;
}


/**
 * Returns a predicate that checks if all property values in `cond` match those in `obj`.
 * Caveats apply - see the README
 */
function matching(cond) {
    var keys = Object.keys(cond);
    return function(obj) {
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (obj[k] !== cond[k]) {
                return false;
            }
        }
        return true;
    };
}
