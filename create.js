
var Create = function () {
    this.platforms
    this.cursors
    // this.hitPlatform

}

Create.prototype = {
    init: function () {

    },
    create: function () {
        if (!game.device.desktop) {
            game.input.onDown.add(gofull, this)
        }
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Sets the size of the world to play in (topleft-most corner x, topleft-most corner y, width, height)
        game.world.setBounds(0, 0, 3000, 600)

        //Creating sprites. (x, y, key)
        game.add.sprite(0, 0, "sky")
        game.add.sprite(200, 500, "star")
        game.add.sprite(700, 100, "diamond")

        //Creating text. (x, y, text, style)
        // game.add.text(200, 200, 'HEY THERE BUDDY', { fontSize: '32px', fill: '#fff' })

        //Creates a group called platforms. We can create/affect the entire group instead of just one instance at a time, such as enabling physics to all of them at once.
        this.platforms = game.add.group()
        this.platforms.enableBody = true;
        game.physics.arcade.enable(this.platforms);

        //Creating an instance of the platforms group to be used as the ground of the world (x, y, key)
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        //Sets the scale of the ground as a percentage (width, height)
        ground.scale.setTo(6, 2);
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
        this.setControls();
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
        cursors = game.input.keyboard.createCursorKeys();

        buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.W)
        buttonDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
        buttonLeft = game.input.keyboard.addKey(Phaser.Keyboard.A)
        buttonRight = game.input.keyboard.addKey(Phaser.Keyboard.D)

        //Creates touch controls for mobile devices.(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        buttonJumpMobile = game.add.button(600, 500, 'test-button', null, this, 0, 1, 0, 1)
        buttonLeftMobile = game.add.button(16, 350, 'test-button', null, this, 0, 1, 0, 1)
        buttonRightMobile = game.add.button(96, 350, 'test-button', null, this, 0, 1, 0, 1)

        //Sets the onInputDown properties to false when created. Seems to be set to true by default for some reason. Set to true so player doesn't move automatically.
        buttonLeftMobile.onInputDown = false
        buttonRightMobile.onInputDown = false

        //Fixes the buttons to the screen
        buttonJumpMobile.fixedToCamera = true
        buttonLeftMobile.fixedToCamera = true
        buttonRightMobile.fixedToCamera = true
    },
    setControls(){
        buttonLeftMobile.events.onInputDown.add(function () { buttonLeftMobile.onInputDown = true })
        buttonLeftMobile.events.onInputUp.add(function () {  buttonLeftMobile.onInputDown = false })
        buttonRightMobile.events.onInputDown.add(function () { buttonRightMobile.onInputDown = true })
        buttonRightMobile.events.onInputUp.add(function () {  buttonRightMobile.onInputDown = false })

    },
    gofull() { game.scale.startFullScreen(false); }
}