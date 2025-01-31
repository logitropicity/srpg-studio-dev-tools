/* ----------------------------------------------------------------------------

As a dev, you may want to quickly refer to a given object, like with foreign
keys, a feature of most databases, or avoid hardcoding IDs into your scripts.

This plugin allows you to set a `ForeignKey` object on an object's custom
parameters, mimicking how a foreign key behaves.


# Examples:
## Custom Parameters
You evaluate the value later in a script with `obj.custom.foo.value()`:
```
{
    // custom parameters look like this:
    foo: new ForeignKey('BaseData.Player', 0)
}
```

## Scripting
```
// below, `value` and `data` evaluate to equivalent objects
var value, data;

value = new ForeignKey('MetaSession.TotalPlayer', 0).value();
data = root.getMetaSession().getTotalPlayerList().getDataFromId(0);

fk = new ForeignKey('BaseData.Interop', [ 3, true ], 2).value();
data = root.getBaseData().getInteropList(3, true).getDataFromId(2);

fk = new ForeignKey('BaseData.GraphicsResource', [ GraphicsType.CHARCHIP, false ], 5, 7).value();
data = (root.getBaseData()
        .getGraphicsResourceList(GraphicsType.CHARCHIP, false)
        .getCollectionDataFromId(5, 7));
```


# Disclaimer
I didn't fully check that the comments accurately describe where you find these
DataLists in the SRPG Studio UI.


# Requirements
    0.lib/backport.js
    0.lib/functional.js

---------------------------------------------------------------------------- */
