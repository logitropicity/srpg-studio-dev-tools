/* ----------------------------------------------------------------------------

### WARNING ###

Srpg Studio uses JScript 5.8, which is a specific implementation of Javascript
with its own quirks. For example, `Object.prototype.propertyIsEnumerable()`
sometimes does not return `true` for own enumerable properties, so:

```
var arr = [];
arr.reverse = 1;

// is true in NodeJS v12.22.9, but false in JScript 5.8
arr.propertyIsEnumerable('reverse');
```

Be aware of what is in your prototype!

---------------------------------------------------------------------------- */
