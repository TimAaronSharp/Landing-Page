var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game-area');

// var baseUrl = window.location.host.includes('localhost') ? '//localhost:3000/api/' : '//'
game.state.add('Boot', Boot)
game.state.add('Preload', Preload)
game.state.add('StartScreen', StartScreen)
game.state.add('Game', Game)
// game.state.add('Update', Update)

game.state.start('Boot', true, true)