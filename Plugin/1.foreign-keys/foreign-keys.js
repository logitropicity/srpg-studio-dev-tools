var DataType = {
    BaseData: {
        // Database
        PLAYER: 'BaseData.Player',
        CLASS: 'BaseData.Class',
        WEAPON: 'BaseData.Weapon',
        ITEM: 'BaseData.Item',
        SKILL: 'BaseData.Skill',
        STATE: 'BaseData.State',

        // Database -> Config
        WEAPON_TYPE: 'BaseData.WeaponType',
        CLASS_TYPE: 'BaseData.ClassType',
        DIFFICULTY: 'BaseData.Difficulty',
        NPC: 'BaseData.Npc',
        CLASS_GROUP: 'BaseData.ClassGroup',
        FONT: 'BaseData.Font',
        RACE: 'BaseData.Race',
        FUSION: 'BaseData.Fusion',
        METAMORPHOZE: 'BaseData.Metamorphoze',
        ORIGINAL_DATA: 'BaseData.OriginalData',

        TERRAIN_GROUP: 'BaseData.TerrainGroup',

        // Game Layout
        MESSAGE_LAYOUT: 'BaseData.MessageLayout',
        SHOP_LAYOUT: 'BaseData.ShopLayout',
        COMMAND_LAYOUT: 'BaseData.CommandLayout',

        RECOLLECTION_EVENT: 'BaseData.RecollectionEvent',

        // Story Settings
        CHARACTER_DICTIONARY: 'BaseData.CharacterDictionary',
        WORD_DICTIONARY: 'BaseData.WordDictionary',
        GALLERY_DICTIONARY: 'BaseData.GalleryDictionary',
        MEDIA_DICTIONARY: 'BaseData.MediaDictionary',

        // Base Settings
        REST_SHOP: 'BaseData.RestShop',
        REST_BONUS: 'BaseData.RestBonus',
        REST_QUEST: 'BaseData.RestQuest',
        REST_AREA: 'BaseData.RestArea',

        // Resource Location
        INTEROP: 'BaseData.Interop',

        // Animations
        MOTION_ANIMATION: 'BaseData.MotionAnimation',
        EFFECT_ANIMATION: 'BaseData.EffectAnimation',

        // Resources
        GRAPHICS_RESOURCE: 'BaseData.GraphicsResource',
        MEDIA_RESOURCE: 'BaseData.MediaResource',
        UI_RESOURCE: 'BaseData.UiResource',
        FONT_RESOURCE: 'BaseData.FontResource',
        VIDEO_RESOURCE: 'BaseData.VideoResource',

        // Open Map -> EN (Unit Settings)
        BOOKMARK_UNIT: 'BaseData.BookmarkUnit',
        // Open Map -> AT (Event Settings)
        BOOKMARK_EVENT: 'BaseData.BookmarkEvent',

        // <home page>
        MAP: 'BaseData.Map',

        // Tools -> Map Color
        MAP_COLOR: 'BaseData.MapColor'
    },

    MetaSession: {
        TOTAL_PLAYER: 'MetaSession.TotalPlayer'
    },

    CurrentSession: {
        // GameSession
        // Open Map -> EN (Unit Settings)
        PLAYER: 'CurrentSession.Player',
        ENEMY: 'CurrentSession.Enemy',
        ALLY: 'CurrentSession.Ally',
        GUEST: 'CurrentSession.Guest',

        // GameSession & RestSession
        // Open Map -> AT (Event Settings)
        PLACE_EVENT: 'CurrentSession.PlaceEvent',
        AUTO_EVENT: 'CurrentSession.AutoEvent',
        TALK_EVENT: 'CurrentSession.TalkEvent',
        OPENING_EVENT: 'CurrentSession.OpeningEvent',
        ENDING_EVENT: 'CurrentSession.EndingEvent',
        COMMUNICATION_EVENT: 'CurrentSession.CommunicationEvent',
        MAP_COMMON_EVENT: 'CurrentSession.MapCommonEvent',

        // GameSession
        // Open Map
        // |-> EN (Unit Settings) -> Item Drops???
        // |-> AT (Event Settings) -> New Event Command -> Battle -> Increase Item Drops???
        TROPHY_POOL: 'CurrentSession.TrophyPool'
    },

    AnimePreference: {
        // Animations -> Animation Information???
        ORIGINAL_MOTION: 'AnimePreference.OriginalMotion'
    }
};


var ForeignKey = inherit({
    /**
     * @constructor
     * @param {string} dataType - DataType
     * @param {Array} [params] - array representing the params of the method,
     *                           i.e. `[ 0, true ]` for `getInteropList(index, isRuntime)`
     * @param {number} id - SRPG Studio ID
     * @param {number} collectionIndex - see `getCollectionDataFromId()`
     */
    constructor: function(dataType, params, id, collectionIndex) {
        var metadata = dataType.split('.');
        this.dataType = dataType;
        this.session = metadata[0];
        this.name = metadata[1];

        if (!Array.prototype.isPrototypeOf(params)) {
            collectionIndex = id;
            id = params;
            params = [];
        }

        this.params = params;
        this.id = id;
        this.collectionIndex = collectionIndex || null;
    },

    value: function() {
        // `root.getBaseData()`, `root.getMetaSession()`, `root.getCurrentSession()`
        // note that `Root` is a thin wrapper around `root`
        var data = Root['get' + this.session]();

        // `data.getInteropList(index, isRuntime)`, `data.getMapCommonEventList()`, ...
        var dataList = data['get' + this.name + 'List'].apply(data, this.params);

        if (this.collectionIndex === null) {
            return dataList.getDataFromId(this.id);
        } else {
            return dataList.getCollectionDataFromId(this.id, this.collectionIndex);
        }
    }
});
