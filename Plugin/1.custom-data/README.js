/* -----------------------------------------------------------------------------

Allows saving / loading additional custom data to / from save files.

Save / load objects by overriding CustomDataManager.save() / .load() .

Note that you can only load primitive objects & data types from the save
file - basically JSON with functions. References aren't serialized, so if you
save an object that was created with `new` / `inherit()` it won't be loaded
with the correct prototype. This also means `undefined` is saved as `null`.

You have will have to define how such objects are serialized / deserialized
yourself.

# Requirements:
    0.lib/backport.js
    0.lib/functional.js

----------------------------------------------------------------------------- */
