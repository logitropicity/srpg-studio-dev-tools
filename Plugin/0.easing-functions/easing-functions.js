/*------------------------------------------------------------------------------

An easing function describes the rate a value changes on the domain [0, 1].

Generally, given an easing function y(x):
1. its "in" function is in(x) = y(x)
2. its "out" function is out(x) = 1 - y(1 - x)
3. its "in-out" function is inout(x) =
   {
      (1/2) *      y(2x)     , on x < 0.5
      1 - (1/2) * y(2(1 - x)), on x >= 0.5
   }

Source: https://github.com/gdsmith/jquery.easing/blob/master/jquery.easing.js

------------------------------------------------------------------------------*/


var Ease = {
    InSine: function(x) {
        return 1 - Math.cos(0.5 * Math.PI * x);
    },

    OutSine: function(x) {
        return Math.sin(0.5 * Math.PI * x);
    },

    InOutSine: function(x) {
        return 0.5 * (1 - Math.cos(Math.PI * x));
    },

    InQuad: function(x) {
        return x * x;
    },

    OutQuad: function(x) {
        x = 1 - x;
        return 1 - x * x;
    },

    InOutQuad: function(x) {
        if (x < 0.5) {
            return 2 * x * x;
        } else {
            x = 1 - x;
            return 1 - 2 * x * x;
        }
    },

    InCubic: function(x) {
        return x * x * x;
    },

    OutCubic: function(x) {
        x = 1 - x;
        return 1 - x * x * x;
    },

    InOutCubic: function(x) {
        if (x < 0.5) {
            return 4 * x * x * x;
        } else {
            x = 1 - x;
            return 1 - 4 * x * x * x;
        }
    },

    InQuart: function(x) {
        return (x *= x) * x;
    },

    OutQuart: function(x) {
        x = 1 - x;
        return 1 - (x *= x) * x;
    },

    InOutQuart: function(x) {
        if (x < 0.5) {
            return 8 * (x *= x) * x;
        } else {
            x = 1 - x;
            return 1 - 8 * (x *= x) * x;
        }
    },

    InQuint: function(x) {
        return x * (x *= x) * x;
    },

    OutQuint: function(x) {
        return 1 - x * (x *= x) * x;
    },

    InOutQuint: function(x) {
        if (x < 0.5) {
            return 16 * x * (x *= x) * x;
        } else {
            x = 1 - x;
            return 1 - 16 * x * (x *= x) * x;
        }
    },

    InExpo: function(x) {
        if (x === 0) {
            return x;
        } else {
            return Math.pow(2, -10 * (1 - x));
        }
    },

    OutExpo: function(x) {
        if (x === 1) {
            return x;
        } else {
            return 1 - Math.pow(2, -10 * x);
        }
    },

    InOutExpo: function(x) {
        if (x === 0 || x === 1) {
            return x;
        } else if (x < 0.5) {
            return 0.5 * Math.pow(2, -20 * (0.5 - x));
        } else {
            return 1 - 0.5 * Math.pow(2, -20 * (x - 0.5));
        }
    },

    InCirc: function(x) {
        return 1 - Math.sqrt(1 - x * x);
    },

    OutCirc: function(x) {
        x = 1 - x;
        return Math.sqrt(1 - x * x);
    },

    InOutCirc: function(x) {
        if (x < 0.5) {
            return 0.5 - Math.sqrt(0.25 - x * x);
        } else {
            x = 1 - x;
            return 0.5 + Math.sqrt(0.25 - x * x);
        }
    }
};


(function() {
    var a = 1.70158;
    var a1 = 1 + a;
    var b = a * 1.525;
    var b1 = 1 + b;
    var c = 2 * Math.PI / 3;
    var d = (2 * Math.PI) / 4.5;  // c * c
    var n = 7.5625;
    var p = 1 / 2.75;

    Ease.InBack = function(x) {
        return  x * x * (a1 * x - a);
    };

    Ease.OutBack = function(x) {
        x = 1 - x;
        return 1 - x * x * (a1 * x - a);
    };

    Ease.InOutBack = function(x) {
        if (x < 0.5) {
            x = 2 * x;
            return 0.5  * x * x * (b1 * x - b);
        } else {
            x = 2 * (1 - x);
            return 1 - 0.5 * x * x * (b1 * x - b);
        }
    };

    Ease.InElastic = function(x) {
        if (x === 0 || x === 1) {
            return x;
        } else {
            x = 1 - x;
            return -Math.pow(2, -10 * x) * Math.sin(-10 * c * (0.075 - x));
        }
    };

    Ease.OutElastic = function(x) {
        if (x === 0 || x === 1) {
            return x;
        } else {
            // note: not sure if this fits the normal definition of an out function
            return 1 + Math.pow(2, -10 * x) * Math.sin(-10 * c * (0.075 - x));
        }
    };

    Ease.InOutElastic = function(x) {
        // note: not sure if this fits the normal definition of an in-out function
        if (x === 0 || x === 1) {
            return x;
        } else if (x < 0.5) {
            return -0.5 * Math.pow(2, 20 * x - 10) * Math.sin(d * (20 * x - 11.125));
        } else {
            return 1 + 0.5 * Math.pow(2, -20 * x + 10) * Math.sin(d * (20 * x - 11.125));
        }
    };

    Ease.InBounce = function(x) {
        x = 1 - x;
        if (x < p) {
            return 1 - n * x * x;
        } else if (x < 2 * p) {
            return 0.25 - n * (x -= 1.5 * p) * x;
        } else if (x < 2.5 * p) {
            return 0.0625 - n * (x -= 2.25 * p) * x;
        } else {
            return 0.015625 - n * (x -= 2.625 * p) * x;
        }
    };

    Ease.OutBounce = function(x) {
        if (x < p) {
            return n * x * x;
        } else if (x < 2 * p) {
            return 0.75 + n * (x -= 1.5 * p) * x;
        } else if (x < 2.5 * p) {
            return 0.9375 + n * (x -= 2.25 * p) * x;
        } else {
            return 0.984375 + n * (x -= 2.625 * p) * x;
        }
    };

    Ease.InOutBounce = function(x) {
        if (x < 0.5) {
            return 0.5 * (1 - Ease.OutBounce(1 - 2 * x));
        } else {
            return 0.5 * (1 + Ease.OutBounce(2 * x - 1));
        }
    };
}());
