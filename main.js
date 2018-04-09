var resolutionWidth = window.innerWidth * window.devicePixelRatio
var resolutionHeight = window.innerHeight * window.devicePixelRatio

var game = new Phaser.Game(resolutionWidth, resolutionHeight, Phaser.CANVAS, 'game-area');

// console.log(`window.innerWidth ${window.innerWidth}`)
// console.log(`window.innerHeight ${window.innerHeight}`)
// console.log(`${resolutionWidth} x ${resolutionHeight}`)

// var baseUrl = window.location.host.includes('localhost') ? '//localhost:3000/api/' : '//'
game.state.add('Boot', Boot)
game.state.add('Preload', Preload)
game.state.add('StartScreen', StartScreen)
game.state.add('GameState', GameState)

game.state.start('Boot', true, true)