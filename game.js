
var Game = function () {
    this.platforms
    this.cursors
    this.moveLeft = false
    this.moveRight = false
    this.scaleRatio = window.devicePixelRatio / 3

}

Game.prototype = {
    init: function () {

    },
    create: function () {
        //Sets the size of the world to play in (topleft-most corner x, topleft-most corner y, width, height)
        game.world.setBounds(0, 0, 800, 600)

        //Creating sprites. (x, y, key)
        var sky = game.add.sprite(0, 0, "sky")
        var star = game.add.sprite(200, 500, "star")
        var diamond = game.add.sprite(700, 100, "diamond")

        // sky.scale.set(configuration.scale_ratio);
        // star.scale.set(configuration.scale_ratio);
        // diamond.scale.set(configuration.scale_ratio);
        sky.scale.setTo(this.scaleRatio, this.scaleRatio)
        star.scale.setTo(this.scaleRatio, this.scaleRatio)
        diamond.scale.setTo(this.scaleRatio, this.scaleRatio)

        //Creating text. (x, y, text, style)
        // game.add.text(200, 200, 'HEY THERE BUDDY', { fontSize: '32px', fill: '#fff' })

        //Creates a group called platforms. We can create/affect the entire group instead of just one instance at a time, such as enabling physics to all of them at once.
        this.platforms = game.add.group()
        this.platforms.enableBody = true;
        game.physics.arcade.enable(this.platforms);
        this.platforms.scale.setTo(this.scaleRatio, this.scaleRatio)

        //Creating an instance of the platforms group to be used as the ground of the world (x, y, key)
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        //Sets the scale of the ground as a percentage (width, height)
        ground.scale.setTo(2, 2);
        //Sets the body of the ground to be immovable, so that it won't move when the player collides with it.
        ground.body.immovable = true;

        //Creating instances of the platforms group to be used as ledges to jump on.
        var ledge = this.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;

        // player = game.add.group();
        //Creating the player sprite (x spawn point, y spawn point, key)
        player = game.add.sprite(32, game.world.height - 150, "dude");
        // player.scale.set(configuration.scale_ratio);
        player.scale.setTo(this.scaleRatio, this.scaleRatio)

        game.physics.arcade.enable(player);
        // player.body.bounce.y = 0.2;
        //Setting the value of the gravity that will affect the player when he jumps/falls off a ledge, etc.
        player.body.gravity.y = 1200;

        //Prevents the player from walking outside of the world bounds
        player.body.collideWorldBounds = true;

        //Adding the animations for the player (key, array of frames, framerate, loop)
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.inputEnabled = true

        this.buttonCreator();
        // this.setControls();
    },
    update: function () {
        //Sets the camera to follow the player
        game.camera.follow(player)

        //sets hitPlatform variable to a collision check between the player and the platforms group. Can use the variable from here on out instead of typing the whole collision check.
        var hitPlatform = game.physics.arcade.collide(player, this.platforms);

        //Sets the players initial x velocity. If this isn't set then the player will not stop after you let go of the movement keys.
        player.body.velocity.x = 0;

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

        //  Allow the player to jump if they are touching the ground.
        buttonJumpMobile.events.onInputDown.add(function () { if (player.body.touching.down && hitPlatform) { player.body.velocity.y = -400; } })
    },
    buttonCreator() {
        //Creates keyboard game controls. game.input.keyboard.createCursorKeys() is a method that sets the arrow keys for movement.
        buttonFullScreen = game.add.button(0, 0, 'test-button', null, this, 0, 1, 0, 1)
        buttonFullScreen.events.onInputDown.add(function () {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen()
            } else {
                this.game.scale.startFullScreen();
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
        })
        //Creates touch controls for mobile devices.(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        // if (!game.device.desktop) {
        buttonJumpMobile = game.add.button(window.innerWidth - 10, window.innerHeight - 64, 'test-button', null, this, 0, 1, 0, 1)
        buttonLeftMobile = game.add.button(window.innerWidth / 2, window.innerHeight - 64, 'test-button', null, this, 0, 1, 0, 1)
        buttonRightMobile = game.add.button(window.innerWidth - 50, window.innerHeight - 64, 'test-button', null, this, 0, 1, 0, 1)

        //Sets the onInputDown properties to false when created. Seems to be set to true by default for some reason. Set to false so player doesn't move automatically.
        buttonLeftMobile.onInputDown = false
        buttonRightMobile.onInputDown = false

        //Fixes the buttons to the screen
        buttonJumpMobile.fixedToCamera = true
        buttonLeftMobile.fixedToCamera = true
        buttonRightMobile.fixedToCamera = true

        //Scales buttons based on DPR (Device Pixel Ratio)
        buttonFullScreen.scale.setTo(this.scaleRatio, this.scaleRatio)
        buttonJumpMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
        buttonLeftMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
        buttonRightMobile.scale.setTo(this.scaleRatio, this.scaleRatio)
        this.setMobileControls()
        // }
    },
    setKeyboardControls() {
        cursors = game.input.keyboard.createCursorKeys();
        // buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.W)
        // buttonDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
        // buttonLeft = game.input.keyboard.addKey(Phaser.Keyboard.A)
        // buttonRight = game.input.keyboard.addKey(Phaser.Keyboard.D)

        cursors.left.onInputDown.add(function () { this.moveLeft = true })
        cursors.left.onInputUp.add(function () { this.moveLeft = false })
        cursors.right.onInputDown.add(function () { this.moveRight = true })
        cursors.right.onInputUp.add(function () { this.moveRight = false })
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