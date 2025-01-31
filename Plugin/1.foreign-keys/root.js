/*------------------------------------------------------------------------------

A thin wrapper around the `root` object.

`root.getBaseData` and `BaseData.getPlayerList` are of type unknown, and those
objects can't be stored or handled normally, so wrapping them at least allows
use of tricks like `Function.apply`.

------------------------------------------------------------------------------*/

var Root = {
    getBaseData: function() {
        var data = root.getBaseData();
        return {
            getPlayerList: function() {
                return data.getPlayerList();
            },

            getClassList: function() {
                return data.getClassList();
            },

            getWeaponList: function() {
                return data.getWeaponList();
            },

            getItemList: function() {
                return data.getItemList();
            },

            getSkillList: function() {
                return data.getSkillList();
            },

            getStateList: function() {
                return data.getStateList();
            },

            getWeaponTypeList: function(index) {
                return data.getWeaponTypeList(index);
            },

            getClassTypeList: function() {
                return data.getClassTypeList();
            },

            getDifficultyList: function() {
                return data.getDifficultyList();
            },

            getNpcList: function(index) {
                return data.getNpcList(index);
            },

            getClassGroupList: function() {
                return data.getClassGroupList();
            },

            getFontList: function() {
                return data.getFontList();
            },

            getRaceList: function() {
                return data.getRaceList();
            },

            getFusionList: function() {
                return data.getFusionList();
            },

            getMetamorphozeList: function() {
                return data.getMetamorphozeList();
            },

            getOriginalDataList: function(index) {
                return data.getOriginalDataList(index);
            },

            getTerrainGroupList: function() {
                return data.getTerrainGroupList();
            },

            getMessageLayoutList: function() {
                return data.getMessageLayoutList();
            },

            getShopLayoutList: function() {
                return data.getShopLayoutList();
            },

            getCommandLayoutList: function(index) {
                return data.getCommandLayoutList(index);
            },

            getRecollectionEventList: function() {
                return data.getRecollectionEventList();
            },

            getCharacterDictionaryList: function() {
                return data.getCharacterDictionaryList();
            },

            getWordDictionaryList: function() {
                return data.getWordDictionaryList();
            },

            getGalleryDictionaryList: function() {
                return data.getGalleryDictionaryList();
            },

            getMediaDictionaryList: function() {
                return data.getMediaDictionaryList();
            },

            getRestShopList: function() {
                return data.getRestShopList();
            },

            getRestBonusList: function() {
                return data.getRestBonusList();
            },

            getRestQuestList: function() {
                return data.getRestQuestList();
            },

            getRestAreaList: function() {
                return data.getRestAreaList();
            },

            getInteropList: function(index, isRuntime) {
                return data.getInteropList(index, isRuntime);
            },

            getMotionAnimationList: function(isRuntime) {
                return data.getMotionAnimationList(isRuntime);
            },

            getEffectAnimationList: function(isRuntime) {
                return data.getEffectAnimationList(isRuntime);
            },

            getGraphicsResourceList: function(type, isRuntime) {
                return data.getGraphicsResourceList(type, isRuntime);
            },

            getMediaResourceList: function(type, isRuntime) {
                return data.getMediaResourceList(type, isRuntime);
            },

            getUiResourceList: function(type, isRuntime) {
                return data.getUiResourceList(type, isRuntime);
            },

            getFontResourceList: function(isRuntime) {
                return data.getFontResourceList(isRuntime);
            },

            getVideoResourceList: function(isRuntime) {
                return data.getVideoResourceList(isRuntime);
            },

            getBookmarkUnitList: function() {
                return data.getBookmarkUnitList();
            },

            getBookmarkEventList: function() {
                return data.getBookmarkEventList();
            },

            getMapList: function() {
                return data.getMapList();
            },

            getMapColorList: function() {
                return data.getMapColorList();
            }
        };
    },

    getMetaSession: function() {
        var data = root.getMetaSession();
        return {
            getTotalPlayerList: function() {
                return data.getTotalPlayerList();
            }
        };
    },

    getCurrentSession: function() {
        var data = root.getCurrentSession();
        return {
            getPlayerList: function() {
                return data.getPlayerList();
            },

            getEnemyList: function() {
                return data.getEnemyList();
            },

            getAllyList: function() {
                return data.getAllyList();
            },

            getGuestList: function() {
                return data.getGuestList();
            },

            getPlaceEventList: function() {
                return data.getPlaceEventList();
            },

            getAutoEventList: function() {
                return data.getAutoEventList();
            },

            getTalkEventList: function() {
                return data.getTalkEventList();
            },

            getOpeningEventList: function() {
                return data.getOpeningEventList();
            },

            getEndingEventList: function() {
                return data.getEndingEventList();
            },

            getCommunicationEventList: function() {
                return data.getCommunicationEventList();
            },

            getMapCommonEventList: function() {
                return data.getMapCommonEventList();
            },

            getTrophyPoolList: function() {
                return data.getTrophyPoolList();
            }
        };
    },

    getAnimePreference: function() {
        var data = root.getAnimePreference();
        return {
            getOriginalMotionList: function(templateIndex) {
                return data.getOriginalMotionList(templateIndex);
            }
        };
    }
};
