var StartScreen = function () {

}
StartScreen.prototype = {
    init: function () {

    },
    create: function () {
        game.scale.pageAlignHorizontally = true; game.scale.pageAlignVertically = true; game.scale.refresh();
        if (game.device.desktop) {
            game.add.text(game.world.centerX, game.world.centerY, 'Click To Play!', { font: '50px Ariel', fill: '#fff' })
        } else {
            game.add.text(game.world.centerX, game.world.centerY, 'Touch To Play!', { font: '50px Ariel', fill: '#fff' })
        }
        game.input.onTap.add(this.startGameFullScreen, this)
        
    },
    startGameFullScreen() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen()
        } else {
            game.scale.startFullScreen();
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        game.state.start('GameState', true, false)

    }
}