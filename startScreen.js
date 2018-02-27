var StartScreen = function () {

}
StartScreen.prototype = {
    init: function () {

    },
    create: function () {
        game.add.text(game.world.centerX, game.world.centerY, 'Touch To Play!', { font: '50px Ariel', fill: '#fff' })
        game.input.onDown.add(function () {
            game.scale.startFullScreen();
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.state.start('Game', true, false)
        })
    }
}