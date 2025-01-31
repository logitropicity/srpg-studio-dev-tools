var RenderLayers = new Layers();  // an array of renderables


ScriptCall_Draw = function(sceneType, layerNumber, commandType) {
    if (layerNumber === 0) {
        if (sceneType !== SceneType.REST) {
            MapLayer.drawMapLayer();
        }
    }
    else if (layerNumber === 1) {
        SceneManager.drawSceneManagerCycle();

        // --- changes start here ---
        // needs to be called here for a stable frame rate
        // draw render layers before GraphicsShow, but over units & menu items
        RenderLayers.next();
        RenderLayers.render();
        // ---- changes end here ----

        // this draws async events like GraphicsShow or AdjustObject,
        // and draws them under messages / backlog
        root.drawAsyncEventData();
    } else {
        // ScriptCall_Draw is called additional times during events
        EventCommandManager.drawEventCommandManagerCycle(commandType);
    }
};
