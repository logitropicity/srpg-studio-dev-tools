var CustomDataManager = {
    save: function() {
        return data;
    },

    load: function(data) {
        return data;
    }
};


Object.assign(LoadSaveScreen, {
    _executeLoad: function() {
        var object = this._scrollbar.getObject();

        if (object.isCompleteFile() || object.getMapInfo() !== null) {
            SceneManager.setEffectAllRange(true);

            // root.changeScene is called inside and changed to the scene which is recorded at the save file.
            // --- changes start here ---
            var index = this._scrollbar.getIndex();
            var loadSaveManager = root.getLoadSaveManager();
            loadSaveManager.loadFile(index);

            var saveFileInfo = loadSaveManager.getSaveFileInfo(index);
            CustomDataManager.load(saveFileInfo.custom.customData || {});
            // ---- changes end here ----
        }
    },

    _getCustomObject: wrap(LoadSaveScreen._getCustomObject, function(prevFunc) {
        return function() {
            var obj = prevFunc.call(this, obj) || {};
            obj.customData = CustomDataManager.save();
            return obj;
        };
    })
});
