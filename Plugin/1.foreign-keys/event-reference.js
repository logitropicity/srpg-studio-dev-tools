UnitEventChecker.getUnitEventFromId = function(unit, id) {
    var count = unit.getUnitEventCount();
    for (var i = 0; i < count; i++) {
        var event = unit.getUnitEvent(i);
        if (event.getId() === id && event.isEvent()) {
            return event;
        }
    }
    return null;
};


var EventReference = inherit({
    constructor: function(foreignKey, id) {
        this.foreignKey = foreignKey;
        this.id = id;
    },

    value: function(unit) {
        // you don't need an id for regular events, but you do need them for unit events
        if (this.id === undefined) {
            // assume if there's no id, the foreignKey leads to an event
            return this.foreignKey.value();
        } else {
            // otherwise, assume that it's a unit event
            unit = unit || this.foreignKey.value();
            return UnitEventChecker.getUnitEventFromId(unit, this.id);
        }
    }
});
