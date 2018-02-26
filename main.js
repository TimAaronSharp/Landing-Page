var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-area');

// var baseUrl = window.location.host.includes('localhost') ? '//localhost:3000/api/' : '//'
game.state.add('Preload', Preload)
game.state.add('Game', Game)
// game.state.add('Update', Update)

game.state.start('Preload', true, true)