## Contents
- **[Renderable Graphics](Plugin/1.graphics-renderables)**\
Offers a higher-level API for manipulating SRPG Studio images.\
\
Can describe operations such as translation, rotation, scaling, and fading as
functions of time (or other options), and chain them together.

- **[Event Injector](Plugin/2.event-injector)**\
Queues events to run next by injecting them into the event cycle.\
\
Effectively, can start events from inside other events or from elsewhere.

- **[Custom Data Manager](Plugin/1.custom-data)**\
Save and load your own data to and from SRPG Studio's save files.\
\
When combined with the event injector, it is possible to cache events to be
run on later turns or stages. You will have to define how to serialize and
deserialize your custom data yourself.

- **[Foreign Keys](Plugin/1.foreign-keys)**\
Creates references to objects in SRPG Studio's database.\
\
Although they are closer to database queries, I call these references
"foreign keys" because like real foreign keys, they are outside references
to a single database object.


### Dependencies
Keep in mind that each of these plugins depend on [other plugins](Plugin/), so:
1. You may need to download additional plugins. Which ones a given plugin needs
   will be listed in its `README.js`.

2. Because SRPG Studio loads plugins in lexicographic order, I prefix the
   plugins with numbers to sort them into tiers and enforce loading order.
   By convention, plugins from the same tier don't depend on each other, but
   may depend on plugins from lower-numbered tiers or be a dependency for
   plugins from higher-numbered tiers.

   So, if you ever need to rename these plugins, please note that while you do
   need to preserve the relative order of differently-tiered plugins, you don't
   need to preserve that order for equally-tiered plugins.
