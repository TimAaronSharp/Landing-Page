var Preload = function () {
    //payload variable to be used to pass data to the "Create" state
    // this.payload = {}
}

Preload.prototype = {
    //function to preload game assets
    preload: function () {

        //first argument is the "key", used to refer to when creating in the "Create state. Second argument is the path to the asset to preload.
        this.game.load.image('sky', '/assets/sky.png')
        this.game.load.image('star', '/assets/star.png')
        this.game.load.image('diamond', '/assets/diamond.png')
        this.game.load.image('ground', '/assets/platform.png');

        this.game.load.spritesheet('dude', '/assets/dude.png', 32, 48)

        //adding keys to the payload for the "Create" state to reference when creating assets
        // this.payload.sky = 'sky'
        // this.payload.star = 'star'
        // this.payload.diamond = 'diamond'
        // this.payload.dude = 'dude'
        // this.payload.ground = 'ground'

    },
    //create function used here only to prevent "Create" state from starting before all assets are preloaded. If it is in the preload function it sometimes starts before assets are loaded.
    create: function () {
        //starting the "Create" state after assets are preloaded. (key, clear world, clear cache, data to pass down to "Create" state)
        game.state.start('Create', true, false)

    }
}