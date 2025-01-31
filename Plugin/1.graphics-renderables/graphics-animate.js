var Renderable = inherit({
    constructor: function() {
        throw Error('Abstract class Renderable cannot be instantiated');
    },

    /**
     * Draws this object at (x, y).
     */
    draw: function(x, y) {
        throw Error('Renderable.draw() not implemented');
    },

    /**
     * Draws this object with bound (x, y) arguments.
     */
    render: function() {
        this.draw(0, 0);
    },

    /**
     * Returns the object which should be rendered next.
     */
    next: function() {
        return this;
    }
});


var Animate = inherit(Renderable, {
    constructor: function() {
        throw Error('Abstract class Animate cannot be instantiated');
    },

    /**
     * Convenience function to set the composition's parameters.
     *
     * @param {Object} [options] - Options to pass to CompositionOperation.Set
     */
    set: function(options) {
        return new CompositionOperation.Set(this, options);
    },

    /**
     * Convenience function to adjust the composition's parameters.
     *
     * @param {Object} [options] - Options to pass to CompositionOperation.Adjust
     */
    adjust: function(options) {
        return new CompositionOperation.Adjust(this, options);
    },

    /**
     * Convenience function to wait for a composition to finish something.
     *
     * @param {Object} [options] - Options to pass to CompositionOperation.Wait
     * @param {function} [options.whilst] - waits while the predicate returns true
     * @param {function} [options.fn] - alias for options.whilst
     * @param {function} [options.t] - The number of frames to wait for.
     *                                 Is overridden by other params.
     */
    wait: function(options) {
        options = options || {};
        if (!options.whilst) {
            if (options.fn) {
                options.whilst = options.fn;
            } else if (options.t !== undefined) {
                var t = 0;
                var frames = options.t;
                options.whilst = function() { return t++ < frames; };
            }
        }
        return new CompositionOperation.Wait(this, options);
    },

    /**
     * Convenience function to remove the animate.
     */
    close: function() {
        return new CompositionOperation.Close(this);
    },

    /**
     * Convenience function to fade the animate in or out.
     *
     * @param {string} [word] - 'in' sets the composition's alpha to zero & fades it in,
     *                          'out' sets the composition's alpha to max & fades it out
     * @param {Object} [options] - Options to pass to CompositionOperation.Fade.
     *                             Is overriden by other params.
     */
    fade: function() {
        var args = Array.prototype.slice.call(arguments, 0, 2);
        var options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
        var word = args.pop();

        var animate = this;
        if (word === 'in') {
            animate = animate.set({alpha: 0});
            options.alpha = typeof options.alpha !== 'number' ? 255 : options.alpha;
        } else if (word === 'out') {
            animate = animate.set({alpha: 255});
            options.alpha = typeof options.alpha !== 'number' ? -255 : -options.alpha;
        }

        return new CompositionOperation.Fade(animate, options);
    },

    /**
     * Convenience function to move the animate.
     *
     * @param {number} [x] - Number of pixels to move right by.
     *                       Must be defined with y to use.
     * @param {number} [y] - Number of pixels to move down by.
     *                       Must be defined with x to use.
     * @param {Object} [options] - Options to pass to CompositionOperation.Move.
     *                             Is overriden by other params.
     */
    move: function() {
        var args = Array.prototype.slice.call(arguments, 0, 3);

        var options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
        var y = args.pop();
        var x = args.pop();

        if (typeof x === 'number' && typeof y === 'number') {
            options.x = x;
            options.y = y;
        }

        return new CompositionOperation.Move(this, options);
    },

    /**
     * Convenience function to rotate the animate.
     *
     * @param {number} [degrees] - Number of degrees to rotate clockwise.
     * @param {Object} [options] - Options to pass to CompositionOperation.Rotate.
     *                             Is overriden by other params.
     */
    rotate: function() {
        var args = Array.prototype.slice.call(arguments, 0, 2);

        var options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
        if (typeof args[args.length - 1] === 'number') {
            options.degree = args.pop();
        }

        return new CompositionOperation.Rotate(this, options);
    },

    /**
     * Convenience function to scale the animate.
     *
     * @param {number} [scale] - Percentage to scale up by.
     * @param {Object} [options] - Options to pass to CompositionOperation.Zoom.
     *                             Is overriden by other params.
     */
    zoom: function() {
        var args = Array.prototype.slice.call(arguments, 0, 2);

        var options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
        if (typeof args[args.length - 1] === 'number') {
            options.scale = args.pop();
        }

        return new CompositionOperation.Zoom(this, options);
    }
});


/*------------------------------------------------------------------------------
---------------------------- Composition Operations ----------------------------
------------------------------------------------------------------------------*/

/**
 * Applies a persistent effect to a Composition.
 *
 * @param {Animate} animate
 */
var CompositionOperation = inherit(Animate, {
    constructor: function(animate) {
        this.target = animate;
        return this;
    },

    value: function() {
        // returns a Composition
        return this.target.value();
    },

    draw: function(x, y) {
        this.target.draw(x, y);
    }
});


/**
 * Instantly sets the composition's parameters.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options] - Options to pass to Composition.set()
 */
CompositionOperation.Set = inherit(CompositionOperation, {
    constructor: function(animate, options) {
        if (CompositionOperation.Wait.prototype.isPrototypeOf(animate)) {
            // using `new this.constructor` will give the wrong prototype to animate.stack
            animate.stack = this.constructor(animate.stack, options);
            animate.pivot = animate.pivot || animate.stack;
            return animate;
        }

        this.options = options;
        return CompositionOperation.call(this, animate);
    },

    next: function() {
        this.target = this.target.next();

        var composition = this.value();
        composition = composition.set(this.options);
        return this.target;
    }
});


/**
 * Instantly adjusts the composition's parameters.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options] - Options to pass to Composition.adjust()
 */
CompositionOperation.Adjust = inherit(CompositionOperation, {
    constructor: function(animate, options) {
        if (CompositionOperation.Wait.prototype.isPrototypeOf(animate)) {
            // using `new this.constructor` will give the wrong prototype to animate.stack
            animate.stack = this.constructor(animate.stack, options);
            animate.pivot = animate.pivot || animate.stack;
            return animate;
        }

        this.options = options;
        return CompositionOperation.call(this, animate);
    },

    next: function() {
        this.target = this.target.next();

        var composition = this.value();
        composition = composition.adjust(this.options);
        return this.target;
    }
});


/**
 * Waits until a predicate return false before applying subsequent composition operations.
 * By default, this waits for all previous composition operations to finish.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options]
 * @param {function} [options.whilst] - the specified predicate
 */
CompositionOperation.Wait = inherit(CompositionOperation, {
    constructor: function(animate, options) {
        if (CompositionOperation.Wait.prototype.isPrototypeOf(animate)) {
            // using `new this.constructor` will give the wrong prototype to animate.stack
            animate.stack = this.constructor(animate.stack, options);
            animate.pivot = animate.pivot || animate.stack;
            return animate;
        }

        options = options || {};
        if (options.whilst) {
            this.whilst = options.whilst;
        }

        this.stack = animate;  // a "stack" of waiting CompositionOperations
        this.pivot = null;  // the base operation in the stack

        return CompositionOperation.call(this, animate, options);
    },

    whilst: function() {
        return this.target !== this.value();
    },

    next: function() {
        this.target = this.target.next();

        if (this.whilst()) {
            return this;
        } else if (this.pivot) {
            this.pivot.target = this.target;
        }
        return this.stack.next();
    }
});


/**
 * Removes the composition and all effects on it.
 *
 * @constructor
 * @param {Animate} animate
 */
CompositionOperation.Close = inherit(CompositionOperation, {
    constructor: function(animate) {
        if (CompositionOperation.Wait.prototype.isPrototypeOf(animate)) {
            // using `new this.constructor` will give the wrong prototype to animate.stack
            animate.stack = this.constructor(animate.stack);
            animate.pivot = animate.pivot || animate.stack;
            return animate;
        }

        return CompositionOperation.call(this, animate);
    },

    next: function() {
        this.target = this.target.next();
        return null;
    }
});


/*------------------------------------------------------------------------------
------------------------ Normal Composition Operations -------------------------
------------------------------------------------------------------------------*/

var CompositionNormalOperation = inherit(CompositionOperation, {
    constructor: function(animate, options) {
        if (!options.fn) {
            return animate;
        } else if (CompositionOperation.Wait.prototype.isPrototypeOf(animate)) {
            // using `new this.constructor` will give the wrong prototype to animate.stack
            animate.stack = this.constructor(animate.stack, options);
            animate.pivot = animate.pivot || animate.stack;
            return animate;
        }

        this.behavior = options.fn;
        this.t = 0;
        this.pv = this.behavior(this.t++);  // process variable

        if (Number.isNaN(this.pv)) {
            return animate;
        }

        animate = this.update(animate, this.pv);
        return CompositionOperation.call(this, animate);
    },

    delta: function(pv0, pv1) {
        throw Error('CompositionNormalOperation.delta() not implemented');
    },

    update: function(animate, delta) {
        throw Error('CompositionNormalOperation.update() not implemented');
    },

    next: function() {
        // normal composition operations can be composed together like
        // functions if the effects are applied with inorder traversal
        var pv1 = this.behavior(this.t++);
        if (Number.isNaN(pv1)) {
            // once inactive, a normal composition operation removes itself
            return this.target.next();
        } else {
            var delta = this.delta(this.pv, pv1);
            this.pv = pv1;
            this.target = this.update(this.target, delta).next();
            return this;
        }
    }
});


/**
 * Fades a composition in or out.
 * Must specify either a nonzero `alpha` or an `fn` option.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options]
 * @param {number} [options.alpha] - the amount to change the alpha value by
 * @param {number} [options.speed] - the speed the alpha value changes at
 * @param {function} [options.fn] - Describes the composition's alpha values over time
 *                                  relative to its original value. Returns `NaN` when
 *                                  the effect is done.
 */
CompositionOperation.Fade = inherit(CompositionNormalOperation, {
    constructor: function(animate, options) {
        options = options || {};
        if(!options.fn && options.alpha) {
            this.sign = Math.sign(options.alpha);
            this.alpha = Math.abs(options.alpha);
            this.speed = options.speed || FadeSpeed.NORMAL;
            options.fn = this.behavior;
        }
        return CompositionNormalOperation.call(this, animate, options);
    },

    behavior: function(t) {
        // var setpoint = this.alpha;
        var pv = this.speed * t;
        if (pv < this.alpha + this.speed) {
            return bounded(-this.alpha, this.alpha, this.sign * pv);
        }
        return NaN;
    },

    delta: function(pv0, pv1) {
        return pv1 - pv0;
    },

    update: function(animate, delta) {
        return animate.adjust({alpha: delta});
    }
});


/**
 * Moves a composition.
 * Must specify either a nonzero `x` / `y` or an `fn` option.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options]
 * @param {number} [options.x] - the number of pixels to move right
 * @param {number} [options.y] - the number of pixels to move down
 * @param {number} [options.speed] - the speed to travel at
 * @param {function} [options.fn] - Describes the composition's positions over time
 *                                  relative to its original value. Returns `NaN`
 *                                  when the effect is done.
 */
CompositionOperation.Move = inherit(CompositionNormalOperation, {
    constructor: function(animate, options) {
        options = options || {};
        if(!options.fn && (options.x || options.y)) {
            var x = options.x || 0;
            var y = options.y || 0;

            var h = Math.hypot(x, y);
            var speed = options.speed || MoveSpeed.NORMAL;

            this.sign = [Math.sign(x), Math.sign(y)];
            this.vector = [Math.abs(x), Math.abs(y)];
            this.speed = [speed * this.vector[0] / h, speed * this.vector[1] / h];
            options.fn = this.behavior;
        }
        return CompositionNormalOperation.call(this, animate, options);
    },

    behavior: function(t) {
        // var setpoint = this.vector;
        var pv = [this.speed[0] * t, this.speed[1] * t];
        if ((pv[0] < this.vector[0] + this.speed[0]) ||
            (pv[1] < this.vector[1] + this.speed[1])) {
            return [bounded(-this.vector[0], this.vector[0], this.sign[0] * pv[0]),
                    bounded(-this.vector[1], this.vector[1], this.sign[1] * pv[1])];
        }
        return NaN;
    },

    delta: function(pv0, pv1) {
        return [pv1[0] - pv0[0], pv1[1] - pv0[1]];
    },

    update: function(animate, delta) {
        return animate.adjust({x: delta[0], y: delta[1]});
    }
});


/**
 * Rotates a composition.
 * Must specify either a nonzero `degree` or an `fn` option.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options]
 * @param {number} [options.degree] - the number of degrees to rotate clockwise
 * @param {number} [options.speed] - the speed to rotate at
 * @param {function} [options.fn] - Describes the composition's angle over time
 *                                  relative to its original value. Returns `NaN`
 *                                  when the effect is done.
 */
CompositionOperation.Rotate = inherit(CompositionNormalOperation, {
    constructor: function(animate, options) {
        options = options || {};
        if(!options.fn && options.degree) {
            this.sign = Math.sign(options.degree);
            this.degree = Math.abs(options.degree);
            this.speed = options.speed || RotateSpeed.NORMAL;
            options.fn = this.behavior;
        }
        return CompositionNormalOperation.call(this, animate, options);
    },

    behavior: function(t) {
        // var setpoint = this.degree;
        var pv = this.speed * t;
        if (pv < this.degree + this.speed) {
            return bounded(-this.degree, this.degree, this.sign * pv);
        }
        return NaN;
    },

    delta: function(pv0, pv1) {
        return pv1 - pv0;
    },

    update: function(animate, delta) {
        return animate.adjust({degree: delta});
    }
});


/**
 * Scales a composition up or down.
 * Must specify either a nonzero `scale` or an `fn` option.
 *
 * @constructor
 * @param {Animate} animate
 * @param {Object} [options]
 * @param {number} [options.scale] - the percentage to scale up or down by
 * @param {number} [options.speed] - the speed to scale up or down at
 * @param {function} [options.fn] - Describes the composition's scale over time
 *                                  relative to its original value. Returns `NaN`
 *                                  when the effect is done.
 */
CompositionOperation.Zoom = inherit(CompositionNormalOperation, {
    constructor: function(animate, options) {
        options = options || {};
        if(!options.fn && options.scale) {
            this.sign = Math.sign(options.scale);
            this.scale = Math.abs(options.scale);
            this.speed = options.speed || ZoomSpeed.NORMAL;
            options.fn = this.behavior;
        }
        return CompositionNormalOperation.call(this, animate, options);
    },

    behavior: function(t) {
        // var setpoint = this.scale;
        var pv = this.speed * t;
        if (pv < this.scale + this.speed) {
            return bounded(-this.scale, this.scale, this.sign * pv);
        }
        return NaN;
    },

    delta: function(pv0, pv1) {
        return pv1 - pv0;
    },

    update: function(animate, delta) {
        return animate.adjust({scale: delta});
    }
});
