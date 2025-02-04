var Cache = {
    Events: []  // event references that you may put into the EventInjector array later
};


Object.assign(LoadControl, {
    save: function() {
        return {
            'Cache.Events': (Cache.Events || []).map(serialize)
        };
    },

    load: function(data) {
        Cache.Events = (data['Cache.Events'] || []).map(deserialize);
    }
});


function serialize(obj) {
    return obj.constructor.serialize(obj);
}


function deserialize(arr) {
    return global[arr[0]].deserialize(arr);
}


Object.assign(ForeignKey, {
    serialize: function(obj) {
        return ['ForeignKey', obj.dataType, obj.params, obj.id, obj.collectionIndex];
    },
    deserialize: function(arr) {
        return new ForeignKey(arr[1], arr[2], arr[3], arr[4]);
    }
});


Object.assign(EventReference, {
    serialize: function(obj) {
        return ['EventReference', serialize(obj.foreignKey), obj.id];
    },
    deserialize: function(arr) {
        return new EventReference(deserialize(arr[1]), arr[2]);
    }
});
