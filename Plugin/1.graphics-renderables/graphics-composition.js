/**
 * Caches renderings to a width x height Image.
 */
var ImageCache = inherit({
    constructor: function(width, height, renderFunc) {
        var graphicsManager = root.getGraphicsManager();

        var cache = graphicsManager.createCacheGraphics(width, height);
        graphicsManager.setRenderCache(cache);
        renderFunc();
        graphicsManager.resetRenderCache();

        return cache;
    }
});


/**
 * Renderable graphic from the Material folder.
 */
var Asset = inherit(Renderable, {
    constructor: function(folder, name, options) {
        options = options || {};

        this.folder = folder;
        this.name = name;
        this.x = options.x || 0;
        this.y = options.y || 0;
    },

    getImage: function() {
        return root.getMaterialManager().createImage(this.folder, this.name);
    },

    value: function() {
        return this;
    },

    draw: function(x, y) {
        var image = this.getImage();
        image.draw(this.x + x, this.y + y);
    }
});


/**
 * Composable cached image with adjustable parameters.
 */
var Composition = inherit(Animate, {
    constructor: function() {
        // array of Asset or Composition
        var array = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        var options = arguments[arguments.length - 1] || {};

        Object.assign(array, Composition.prototype);
        array.cache = null;

        array.width = options.width || 0;
        array.height = options.height || 0;

        array.setX(options.x || 0);
        array.setY(options.y || 0);
        array.setAlpha(options.alpha === 0 ? 0 : (options.alpha || 255));
        array.setDegree(options.degree || 0);
        // note: Array.prototype.reverse is a function; here it is a boolean constant
        array.setReverse(options.reverse || false);
        array.setScale(options.scale === 0 ? 0 : (options.scale || 100));

        return array;
    },

    value: function() {
        if (!this.cache) {
            var renderFunc = Layers.prototype.draw.bind(this, -this.x, -this.y);
            this.cache = new ImageCache(this.width, this.height, renderFunc);
        }
        return this;
    },

    draw: function(x, y) {
        var cache = this.value().cache;

        cache.setAlpha(this.alpha);
        cache.setDegree(this.degree);
        cache.setReverse(this.reverse);
        cache.setScale(this.scale);

        cache.draw(this.x + x, this.y + y);
    },

    set: function(options) {
        options = options || {};
        for (var prop in options) {
            var setter = Composition._setters[prop];
            this[setter](options[prop]);
        }
        return this;
    },

    adjust: function(options) {
        options = options || {};
        for (var prop in options) {
            var setter = Composition._setters[prop];
            this[setter](this[prop] + options[prop]);
        }
        return this;
    },

    close: function() {
        return null;
    },

    setX: function(x) {
        this.x = x;
        return this;
    },

    setY: function(y) {
        this.y = y;
        return this;
    },

    setAlpha: function(alpha) {
        this.alpha = bounded(0, 255, alpha);
        return this;
    },

    setDegree: function(degree) {
        this.degree = mod(degree, 360);
        return this;
    },

    setReverse: function(reverse) {
        // +false === 0, +true === 1
        this.reverse = Boolean(mod(+reverse, 2));
        return this;
    },

    setScale: function(scale) {
        this.scale = Math.max(0, scale);
        return this;
    },

    addSpecialEffect: function(name) {
        var args = arguments;

        var cache = this.value().cache;
        var compose = root.getGraphicsManager().createComposition();
        compose.setImage(cache);

        var mode;
        switch (name) {
            case 'image':
                compose.setImage(args[1]);
                mode = args[2];
                break;

            case 'image parts':
                compose.setImageParts(args[1], args[2], args[3], args[4], args[5]);
                mode = args[6];
                break;

            case 'saturation':
                compose.setSaturation(args[1]);
                mode = args[2];
                break;

            case 'brightness':
                compose.setBrightness(args[1]);
                mode = args[2];
                break;

            case 'gaussian blur':
                compose.setGaussianBlur(args[1]);
                mode = args[2];
                break;

            case 'direction blur':
                compose.setDirectionBlur(args[1]);
                mode = args[2];
                break;

            case 'hue rotation':
                compose.setHueRotation(args[1]);
                mode = args[2];
                break;

            case 'color channel':
                compose.setColorChannel(args[1], args[2], args[3], args[4]);
                mode = args[5];
                break;

            case 'affin':
                compose.setAffin(args[1]);
                mode = args[2];
                break;

            case 'blend bitmap':
                compose.setBlendBitmap(args[1], args[2], args[3]);
                mode = args[4];
                break;

            default:
                return this;
        }

        compose.composite(mode || CompositeMode.SOURCE_OVER);
        cache.setComposition(compose);

        var renderFunc = function() { cache.draw(0, 0); };
        this.cache = new ImageCache(cache.getWidth(), cache.getHeight(), renderFunc);

        return this;
    }
});

Composition._setters = {
    x: 'setX',
    y: 'setY',
    alpha: 'setAlpha',
    degree: 'setDegree',
    reverse: 'setReverse',
    scale: 'setScale'
};


/**
 * Composable uncached image of renderables that's also an Array.
 */
var Layers = inherit(Renderable, {
    // http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
    constructor: function(options) {
        options = options || {};

        var array = Object.assign([], Layers.prototype);
        array.x = options.x || 0;
        array.y = options.y || 0;

        return array;
    },

    draw: function(x, y) {
        for (var i = 0; i < this.length; i++) {
            if (this[i]) {
                this[i].draw(this.x + x, this.y + y);
            }
        }
    },

    next: function() {
        for (var i = 0; i < this.length; i++) {
            if (this[i]) {
                this[i] = this[i].next();
            }
        }
        return this;
    },

    clear: function() {
        this.splice(0, this.length);
    }
});
