/**
 * Mimic's NodeJS's global object
 */
if (!this['global']) {
    var global = this;
}


/**
 * Mimics normal Javascript's Object.assign()
 * Caveats apply - see the README
 */
if (!Object.assign) {
    // See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
    Object.assign = function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var property in obj) {
                if (obj.propertyIsEnumerable(property)) {
                    target[property] = obj[property];
                }
            }
        }
        return target;
    };
}


/**
 * Mimics normal Javascript's Object.keys()
 * Caveats apply - see the README
 */
if (!Object.keys) {
    Object.keys = function(obj) {
        var out = [];
        for (var property in obj) {
            if (obj.propertyIsEnumerable(property)) {
                out.push(property);
            }
        }
        return out;
    };
}


/**
 * Mimics normal Javascript's Object.values()
 * Caveats apply - see the README
 */
if (!Object.values) {
    Object.values = function(obj) {
        var out = [];
        for (var property in obj) {
            if (obj.propertyIsEnumerable(property)) {
                out.push(obj[property]);
            }
        }
        return out;
    };
}


/**
 * Mimics normal Javascript's Function.prototype.bind()
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function(thisArg) {
        var fn = this;
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return fn.apply(thisArg, args.concat(Array.prototype.slice.call(arguments, 0)));
        }
    };
}


/**
 * Mimics normal Javascript's Array.prototype.map
 */
if (!Array.prototype.map) {
    Array.prototype.map = function(callbackFn, thisArg) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
            out[i] = callbackFn.call(thisArg, this[i], i, this);
        }
        return out;
    };
}


/**
 * Mimics normal Javascript's Array.prototype.forEach
 */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callbackFn, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callbackFn.call(thisArg, this[i], i, this);
        }
        return undefined;
    };
}


/**
 * Mimics normal Javascript's Array.prototype.filter
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callbackFn, thisArg) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
            if (callbackFn.call(thisArg, this[i], i, this)) {
                out.push(this[i]);
            }
        }
        return out;
    };
}


/**
 * Mimics normal Javascript's Array.prototype.reduce
 */
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callbackFn, initialValue) {
        var i, accumulator;
        if (arguments.length >= 2) {
            accumulator = initialValue;
            i = 0;
        } else if (this.length > 0) {
            accumulator = this[0];
            i = 1;
        } else {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        for (; i < this.length; i++) {
            // note: if callbackFn is non-strict, callbackFn's thisArg should be globalThis
            accumulator = callbackFn.call(undefined, accumulator, this[i], i, this);
        }

        return accumulator;
    };
}


/**
 * Mimics normal Javascript's Array.prototype.find
 */
if (!Array.prototype.find) {
    Array.prototype.find = function(callbackFn, thisArg) {
        for (var i = 0; i < this.length; i++) {
            if (callbackFn.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
}


/**
 * Mimics normal Javascript's Number.isNaN
 */
if (!Number.isNaN) {
    Number.isNaN = function(x) {
        return typeof x === 'number' && isNaN(x);
    };
}


/**
 * Mimics normal Javascript's Math.hypot
 */
if (!Math.hypot) {
    Math.hypot = function() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i] * arguments[i];
        }
        return Math.sqrt(sum);
    };
}


/**
 * Mimics normal Javascript's Math.sign
 */
if (!Math.sign) {
    Math.sign = function(x) {
        if (x > 0) {
            return 1;
        } else if (x < 0) {
            return -1;
        } else if (x === 0) {
            return x;  // 0 or -0
        } else {
            return NaN;
        }
    };
}
