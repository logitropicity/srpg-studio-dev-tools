Object.assign(LoadControl, {
    save: function() {
        // override me!
        return {};
    },

    load: function(data) {
        // override me!
    },

    start: wrap(LoadControl.start, function(prevFunc) {
        return function(customObject) {
            prevFunc.call(this);
            this.load(customObject.customData);
        };
    })
});


Object.assign(LoadSaveScreen, {
    _getCustomObject: wrap(LoadSaveScreen._getCustomObject, function(prevFunc) {
        return function() {
            obj = prevFunc.call(this) || {};
            obj.customData = LoadControl.save();
            return obj;
        };
    })
});
