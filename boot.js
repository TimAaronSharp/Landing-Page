var Boot = function () {

}

Boot.prototype = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('Preload', true, false)
    }
}