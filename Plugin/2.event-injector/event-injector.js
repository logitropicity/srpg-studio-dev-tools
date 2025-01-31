// inject events into the EventChecker cycle by pushing `EventReference`s into this array
var EventInjector = [];


Object.assign(EventChecker, {

    _injectorIndex: 0,

    enterEventChecker: wrap(EventChecker.enterEventChecker, function(prevFunc) {
        return function(eventList, eventType) {
            this._injectorIndex = 0;
            prevFunc.call(this, eventList, eventType);
        };
    }),

    _isEventFree: function(event) {
        // you can't use a hook to alter `event.getExecutedMark()`
        // and some events, like bookmark or unit events, are always `EventExecutedType.EXECUTED`
        // so you need a custom parameter to inject them
        return event.custom.isFree || event.getExecutedMark() === EventExecutedType.FREE;
    },

    _checkEvent: function() {
        // --- changes start here ---
        while(this._eventIndex < this._eventArray.length || this._injectorIndex < EventInjector.length) {

            // some events may inject more events, so always need to check if they've run out
            if (this._injectorIndex >= EventInjector.length) {
                EventInjector.splice(0, EventInjector.length);
                this._injectorIndex = 0;
            }

            var event = EventInjector.length > 0
                        ? EventInjector[this._injectorIndex++].value()
                        : this._eventArray[this._eventIndex++];

            if (event !== null && this._isEventFree(event) && event.isEvent()) {
        // ---- changes end here ----
                if (this._isAllSkipEnabled) {
                    root.setEventSkipMode(true);
                }

                if (!this._isSessionEnabled()) {
                    continue;
                }

                // some events will return `EnterResult.NOTENTER` despite having completed successfully
                result = this._capsuleEvent.enterCapsuleEvent(event, true);
                if (result === EnterResult.OK) {
                    return EnterResult.OK;
                }
            }
        }

        return EnterResult.NOTENTER;
    }
});
