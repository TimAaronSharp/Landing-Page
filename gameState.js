
var GameState = function () {
    this.map
    this.bottomLayer
    this.midLayer
    this.topLayer
    this.platforms
    this.cursors
    this.scaleRatio = window.devicePixelRatio / 3
}

GameState.prototype = {
    init: function () {

    },
    create: function () {
        // console.log(`scaleRatio ${this.scaleRatio}`)
        // console.log(game)

        game.scale.pageAlignHorizontally = true; game.scale.pageAlignVertically = true; game.scale.refresh();

        this.map = game.add.tilemap('map')
        this.map.addTilesetImage('Acid (2)', 'Acid (2)-tiles')
        this.map.addTilesetImage('acid1', 'acid1-tiles')
        this.map.addTilesetImage('BGTile (1)', 'BGTile (1)-tiles')
        this.map.addTilesetImage('BGTile (3)', 'BGTile (3)-tiles')
        this.map.addTilesetImage('BGTile (4)', 'BGTile (4)-tiles')
        this.map.addTilesetImage('Tile (1)', 'Tile (1)-tiles')
        this.map.addTilesetImage('Tile (7)', 'Tile (7)-tiles')
        this.map.addTilesetImage('Tile (8)', 'Tile (8)-tiles')

        
        this.bottomLayer = this.map.createLayer('Tile Layer 1')
        this.midLayer = this.map.createLayer('Tile Layer 2')
        
        this.map.setCollisionBetween(21, 25, true, this.midLayer)

        //Sets the size of the world to the size of this layer (this.bottomLayer is the background layer in the tilemap, so resizing to this layer makes the world as big as we need)
        this.bottomLayer.resizeWorld()
      
        this.setKeyboardControls()

        //Creates a group called platforms. We can create/affect the entire group instead of just one instance at a time, such as enabling physics to all of them at once.
        // this.platforms = game.add.group()
        // this.platforms.enableBody = true;
        // game.physics.arcade.enable(this.platforms);

        //Creating the player sprite (x spawn point, y spawn point, key)
        player = game.add.sprite(200, 300, "dude");
        player.scale.setTo(this.scaleRatio, this.scaleRatio)
        game.physics.arcade.enable(player);
        //Sets the camera to follow the player
        game.camera.follow(player)

        // player.anchor.setTo(this.scaleRatio, this.scaleRatio)

        //Setting the value of the gravity that will affect the player when he jumps/falls off a ledge, etc.
        player.body.gravity.y = 1200;

        //Prevents the player from walking outside of the world bounds
        player.body.collideWorldBounds = true;

        //Adding the animations for the player (key, array of frames, framerate, loop)
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.inputEnabled = true
        // console.log(`devicePixelRatio = ${window.devicePixelRatio}`)
        console.log(player)
        this.buttonCreator();
        // this.setControls();
        console.log(this.map)
        this.midLayer.debug = true

        //The player is not colliding with the terrain after spawning unless you jump before hitting the ground for some reason. Telling the player to jump as he is falling fixes this. Will invesigate a better way to fix this later.
        buttonJump.isDown = true
        buttonJump.isDown = false
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, this.midLayer);

        //Sets the players initial x velocity. If this isn't set then the player will not stop after you let go of the movement keys.
        player.body.velocity.x = 0;
        if (!game.device.desktop) {
            if (buttonLeftMobile.onInputDown) {
                player.body.velocity.x = -300;
                player.animations.play('left');
            }
            else if (buttonRightMobile.onInputDown) {
                player.body.velocity.x = 300;
                player.animations.play('right');
            }
            else {
                player.animations.stop();
                player.frame = 4;
            }
            buttonJumpMobile.events.onInputDown.add(function () { if (player.body.touching.down) { player.body.velocity.y = -400; } })
        } else {
            if (buttonLeft.isDown) {
                player.body.velocity.x = -300;
                player.animations.play('left');
            } else if (buttonRight.isDown) {
                player.body.velocity.x = 300;
                player.animations.play('right');
            }
            else {
                player.animations.stop();
                player.frame = 4;
            }
            //  Allow the player to jump if they are touching the ground.
            if (buttonJump.isDown && hitPlatform) { player.body.velocity.y = -400; }
        }
    },
    buttonCreator() {

        //Creates keyboard game controls. game.input.keyboard.createCursorKeys() is a method that sets the arrow keys for movement.
        buttonFullScreen = game.add.button(0, 0, 'test-button', null, this, 0, 1, 0, 1)
        buttonFullScreen.fixedToCamera = true
        buttonFullScreen.events.onInputDown.add(function () {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen()
            } else {
                this.game.scale.startFullScreen();
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
        })
        //Creates touch controls for mobile devices.(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        buttonFullScreen.scale.setTo(this.scaleRatio, this.scaleRatio)
        if (!game.device.desktop) {
            buttonJumpMobile = game.add.button(window.innerWidth - 90, window.innerHeight - 192, 'test-button', null, this, 0, 1, 0, 1)
            buttonLeftMobile = game.add.button(window.innerWidth - window.innerWidth, window.innerHeight - 64, 'test-button', null, this, 0, 1, 0, 1)
            buttonRightMobile = game.add.button(window.innerWidth - 90, window.innerHeight - 64, 'test-button', null, this, 0, 1, 0, 1)

            //Sets the onInputDown properties to false when created. Seems to be set to true by default for some reason. Set to false so player doesn't move automatically.
            buttonLeftMobile.onInputDown = false
            buttonRightMobile.onInputDown = false

            //Fixes the buttons to the screen
            buttonJumpMobile.fixedToCamera = true
            buttonLeftMobile.fixedToCamera = true
            buttonRightMobile.fixedToCamera = true

            //Scales buttons based on DPR (Device Pixel Ratio)
            buttonJumpMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
            buttonLeftMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
            buttonRightMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
            this.setMobileControls()
        }
    },
    setKeyboardControls() {
        //createCursorKeys() is a Phaser method that assigns controls to the up, down, left, and right keyboard keys.
        cursors = game.input.keyboard.createCursorKeys();
        buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.W)
        buttonLeft = game.input.keyboard.addKey(Phaser.Keyboard.A)
        buttonRight = game.input.keyboard.addKey(Phaser.Keyboard.D)
    },
    setMobileControls() {
        buttonLeftMobile.events.onInputDown.add(function () { buttonLeftMobile.onInputDown = true })
        buttonLeftMobile.events.onInputUp.add(function () { buttonLeftMobile.onInputDown = false })
        buttonRightMobile.events.onInputDown.add(function () { buttonRightMobile.onInputDown = true })
        buttonRightMobile.events.onInputUp.add(function () { buttonRightMobile.onInputDown = false })

    },
    goFull() {
        if (this.game.scale.startFullScreen) {
            this.game.scale.stopFullScreen
        } else {

            game.scale.startFullScreen();
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    }
}

// if (this.game.device.desktop) {
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.scale.minWidth = gameWidth / 2;
//     this.scale.minHeight = gameHeight / 2;
//     this.scale.maxWidth = gameWidth;
//     this.scale.maxHeight = gameHeight;
//     this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//     this.scale.setScreenSize(true);
// }
// else {
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.scale.minWidth = gameWidth / 2;
//     this.scale.minHeight = gameHeight / 2;
//     this.scale.maxWidth = 2048; //You can change this to gameWidth*2.5 if needed            this.scale.maxHeight = 1228; //Make sure these values are proportional to the gameWidth and gameHeight            this.scale.pageAlignHorizontally = true;            this.scale.pageAlignVertically = true;            this.scale.forceOrientation(true, false);            this.scale.hasResized.add(this.gameResized, this);            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);            this.scale.setScreenSize(true);       
// }

//Creating sprites. (x, y, key)
        // var sky = game.add.sprite(0, 0, "sky")
        // var star = game.add.sprite(200, 500, "star")
        // var diamond = game.add.sprite(700, 100, "diamond")
        // sky.anchor.setTo(this.scaleRatio,this.scaleRatio)
        // star.anchor.setTo(this.scaleRatio,this.scaleRatio)
        // diamond.anchor.setTo(this.scaleRatio,this.scaleRatio)

        // sky.scale.setTo(2, 2)

        // sky.scale.setTo(this.scaleRatio, this.scaleRatio)
        // star.scale.setTo(this.scaleRatio, this.scaleRatio)
        // diamond.scale.setTo(this.scaleRatio, this.scaleRatio)

        // console.log(sky)
        // console.log(star)
        // console.log(diamond)
        // console.log(game.world)
        // console.log(window)
        // console.log(`game.world.height = ${game.world.height}`)
        // console.log(`game.world.width = ${game.world.width}`)



        //Creating an instance of the platforms group to be used as the ground of the world (x, y, key)
        // var ground = this.platforms.create(0, game.world.height - 32, 'ground');

        //Sets the scale of the ground as a percentage (width, height)
        // ground.scale.set(this.scaleRatio, this.scaleRatio)

        // game.add.text(ground.x, ground.y, 'GROUND', { font: '50px Ariel', fill: '#fff' })

        //Sets the body of the ground to be immovable, so that it won't move when the player collides with it.
        // ground.body.immovable = true;

        //Creating instances of the platforms group to be used as ledges to jump on.
        // var ledge = this.platforms.create(game.world.width -(game.world.width + 300), game.world.height - 200, 'ground');
        // ledge.scale.set(this.scaleRatio, this.scaleRatio)
        // ledge.body.immovable = true;

        // ledge = this.platforms.create(game.world.width - (game.world.width + 150), game.world.height - 450, 'ground');
        // ledge.scale.set(this.scaleRatio, this.scaleRatio)
        // ledge.body.immovable = true;

        // this.platforms.children.forEach(function (platform) {
            // platform.scale.set(this.scaleRatio, this.scaleRatio)
            // platform.anchor.setTo(this.scaleRatio, this.scaleRatio)
            // console.log(platform)
        // })


        //sets hitPlatform variable to a collision check between the player and the platforms group. Can use the variable from here on out instead of typing the whole collision check.
        // var hitPlatform = game.physics.arcade.collide(player, this.platforms);