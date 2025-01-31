/*------------------------------------------------------------------------------

Implements the custom RenderWait event command.

This command waits for the specified RenderLayers to finish their animations
before proceeding with the rest of the event commands.

Properties:
```
{
    // waits for RenderLayers[0], RenderLayers[3] to finish their animations
    ids: [0, 3]
}
```

------------------------------------------------------------------------------*/

var RenderWaitEventCommand = defineObject(BaseEventCommand, {
    // Put this value in Script Execute -> Call Event Command -> Object Name
    getEventCommandName: function() {
        return "RenderWait";
    },

    enterEventCommandCycle: function() {
        var eventCommandData = root.getEventCommandObject();
        var args = eventCommandData.getEventCommandArgument();
        this._ids = args.ids || [];

        if (this._ids.length === 0 || !this.isEventCommandContinue()) {
            return EnterResult.NOTENTER;
        }

        return EnterResult.OK;
    },

    moveEventCommandCycle: function() {
        for (var i = 0; i < this._ids.length; i++) {
            var layer = RenderLayers[this._ids[i]];
            if (layer && layer.value() !== layer) {
                return MoveResult.CONTINUE;
            }
        }
        return MoveResult.END;
    },

    mainEventCommand: function() {
        // assume that everything in RenderLayers is being rendered as part of an event
        // assume that RenderLayers doesn't have an infinite animation loop
        while (true) {
            var end = true;
            for (var i = 0; i < this._ids.length; i++) {
                var layer = RenderLayers[this._ids[i]];
                if (layer && layer.value() !== layer) {
                    RenderLayers[this._ids[i]] = layer.next();
                    end = false;
                }
            }

            if (end) {
                return;
            }
        }
    }
});


// register custom event command so it can be called with Script Execute Event Command
Object.assign(ScriptExecuteEventCommand, {
    _configureOriginalEventCommand: wrap(ScriptExecuteEventCommand._configureOriginalEventCommand, function(prevFunc) {
        return function(groupArray) {
            prevFunc.call(this, groupArray);
            groupArray.appendObject(RenderWaitEventCommand);
        };
    })
});
