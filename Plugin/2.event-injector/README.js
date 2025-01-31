/*------------------------------------------------------------------------------

Enables dynamically injecting events into the battle map event cycle.
Injected events are run immediately after the current event completes.

Set this on an event, such as a bookmark or unit event.
Custom Parameters:
```
{
    // if true, ignores the event's executed mark & runs the event
    isFree: true
}
```

By saving event references in an array, it is possible to delay execution of
events and incrementally build which events you want to run later, instead of
relying on many different flags.

# Requirements
    0.lib/backport.js
    0.lib/functional.js
    1.foreign-keys/

------------------------------------------------------------------------------*/
