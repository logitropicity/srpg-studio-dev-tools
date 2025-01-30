
var SaveCallEventCommand = defineObject(BaseEventCommand,
{
	_loadSaveScreen: null,
	
	enterEventCommandCycle: function() {
		this._prepareEventCommandMemberData();
		
		if (!this._checkEventCommand()) {
			return EnterResult.NOTENTER;
		}
		
		return this._completeEventCommandMemberData();
	},
	
	moveEventCommandCycle: function() {
		if (SceneManager.isScreenClosed(this._loadSaveScreen)) {
			SceneManager.setForceForeground(false);
			return MoveResult.END;
		}
		
		return MoveResult.CONTINUE;
	},
	
	drawEventCommandCycle: function() {
	},
	
	isEventCommandSkipAllowed: function() {
		// Don't allow the skip by pressing the Start.
		return false;
	},
	
	_prepareEventCommandMemberData: function() {
		this._loadSaveScreen = createObject(LoadSaveControl.getSaveScreenObject());
	},
	
	_checkEventCommand: function() {
		return true;
	},
	
	_completeEventCommandMemberData: function() {
		var screenParam;
		
		if (root.getEventCommandObject().getSaveCallType() === SaveCallType.COMPLETE) {
			this._doCompleteAction();
			return EnterResult.NOTENTER;
		}
		
		screenParam = this._createScreenParam();
		SceneManager.addScreen(this._loadSaveScreen, screenParam);
		SceneManager.setForceForeground(true);
		
		this._doCurrentAction();
		
		return EnterResult.OK;
	},
	
	_doCurrentAction: function() {
		var unit;
		
		// The unit can only be in the wait state in the FREE scene.
		if (root.getBaseScene() !== SceneType.FREE) {
			return;
		}
		
		// If "Infinite Actions" is enabled, the unit will not be in the wait state.
		if (root.getCurrentSession().isMapState(MapStateType.PLAYERFREEACTION)) {
			return;
		}
		
		unit = this._getUnitFromUnitCommand();
		if (unit !== null) {
			// If a save is performed via a unit command, the unit must be considered as waiting.
			// If you put the unit in the wait state, the wait state is saved in the save file.
			unit.setWait(true);
		}
	},
	
	_getUnitFromUnitCommand: function() {
		if (root.getCurrentSession().getTurnType() !== TurnType.PLAYER) {
			return null;
		}
		
		// You should not call root.getCurrentSession().getActiveEventUnit().
		// When executing an AT event with "Player Turn Start" set, it refers to the last unit that acted on the enemy turn. 
		return SceneManager.getActiveScene().getTurnObject().getTurnTargetUnit();
	},
	
	_doCompleteAction: function() {
		// This method notifies the host that the game has been cleared with the save file currently in use.
		// By calling this method, you can create a save file recorded as cleared in the ending scene.
		root.getEventCommandObject().setCompleteSaveFlag();
	},
	
	_createScreenParam: function() {
		var screenParam = ScreenBuilder.buildLoadSave();
		
		screenParam.isLoad = false;
		
		// If getCurrentScene is called with the event command, SceneType.EVENT is returned, so call getBaseScene.
		screenParam.scene = root.getBaseScene();
		screenParam.mapId = this._getMapId(screenParam.scene);
		
		return screenParam;
	},
	
	_getMapId: function(sceneType) {
		var mapId;
		
		if (sceneType === SceneType.REST) {
			mapId = root.getSceneController().getNextMapId();
		}
		else {
			mapId = root.getCurrentSession().getCurrentMapInfo().getId();
		}
		
		return mapId;
	}
}
);
