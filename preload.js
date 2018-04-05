var Preload = function () {
}

Preload.prototype = {
    init: function () {

    },
    //function to preload game assets
    preload: function () {
        game.scale.pageAlignHorizontally = true; game.scale.pageAlignVertically = true; game.scale.refresh();
        game.add.text(0, 0, 'Loading...')

        //first argument is the "key", used to refer to when creating in the "Create state. Second argument is the path to the asset to preload.
        this.game.load.image('sky', './assets/sky.png')
        this.game.load.image('star', './assets/star.png')
        this.game.load.image('diamond', './assets/diamond.png')
        this.game.load.image('ground', './assets/platform.png');
        this.game.load.image('test-button', './assets/test-button.png')

        this.game.load.image('Acid (2)-tiles', './assets/tiles/Acid (2).png')
        this.game.load.image('acid1-tiles', './assets/tiles/Acid (1).png')
        this.game.load.image('BGTile (1)-tiles', './assets/tiles/BGTile (1).png')
        this.game.load.image('BGTile (3)-tiles', './assets/tiles/BGTile (3).png')
        this.game.load.image('BGTile (4)-tiles', './assets/tiles/BGTile (4).png')
        this.game.load.image('Tile (1)-tiles', './assets/tiles/Tile (1).png')
        this.game.load.image('Tile (7)-tiles', './assets/tiles/Tile (7).png')
        this.game.load.image('Tile (8)-tiles', './assets/tiles/Tile (8).png')

        this.game.load.spritesheet('dude', './assets/dude.png', 96, 144)
        this.game.load.tilemap('map', './assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON)

    },
    //create function used here only to prevent "Create" state from starting before all assets are preloaded. If it is in the preload function it sometimes starts before assets are loaded.
    create: function () {
        //starting the "Create" state after assets are preloaded. (key, clear world, clear cache, data to pass down to "Create" state)
        game.state.start('StartScreen', true, false)

    }
}