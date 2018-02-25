
var Create = function () {
    this.platforms
    this.cursors
    this.buttonJump
    this.buttonDown
    this.buttonLeft
    this.buttonRight
    this.buttonLeftMobile
    this.buttonRightMobile
    this.moveLeft = false
    this.moveRight = false

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
    },
    update: function () {
        //Sets the camera to follow the player
        game.camera.follow(player)

        //sets hitPlatform variable to a collision check between the player and the platforms group. Can use the variable from here on out instead of typing the whole collision check.
        var hitPlatform = game.physics.arcade.collide(player, this.platforms);

        //Sets the players initial x velocity. If this isn't set then the player will not stop after you let go of the movement keys.
        player.body.velocity.x = 0;


        // console.log(`Left: ${this.moveLeft} Right: ${this.moveRight}`)


        if (this.moveLeft) {
            //  Move to the left
            player.body.velocity.x = -300;

            player.animations.play('left');
        }
        else if (this.moveRight) {
            //  Move to the right
            player.body.velocity.x = 300;

            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
        // console.log(`moveLeft: ${this.moveLeft}`)

        //  Allow the player to jump if they are touching the ground.
        this.buttonJump.events.onInputDown.add(function () { if (player.body.touching.down && hitPlatform) { player.body.velocity.y = -400; } })

        this.buttonLeftMobile.events.onInputDown.add(function () {
            this.moveLeft = true
            if (this.moveLeft) {
                player.body.velocity.x = -300;
            }
        })
        this.buttonLeftMobile.events.onInputUp.add(function () { this.moveLeft = false })
        this.buttonRightMobile.events.onInputDown.add(function () {
            this.moveRight = true
            if (this.moveRight) {
                player.body.velocity.x = 300;
            }
        })
        this.buttonRightMobile.events.onInputUp.add(function () { this.moveRight = false })
        // game.physics.arcade.collide(stars, platforms);

    },
    buttonCreator() {
        //Creates keyboard game controls. game.input.keyboard.createCursorKeys() is a method that sets the arrow keys for movement.
        cursors = game.input.keyboard.createCursorKeys();

        // buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.buttonDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.buttonLeft = game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.buttonRight = game.input.keyboard.addKey(Phaser.Keyboard.D)

        //Creates touch controls for mobile devices.(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        this.buttonJump = game.add.button(600, 500, 'test-button', null, this, 0, 1, 0, 1)
        this.buttonLeftMobile = game.add.button(16, 500, 'test-button', null, this, 0, 1, 0, 1)
        this.buttonRightMobile = game.add.button(96, 500, 'test-button', null, this, 0, 1, 0, 1)

        this.buttonLeftMobile.events.onInputOver.add(function () { this.moveLeft = true })
        this.buttonLeftMobile.events.onInputOut.add(function () { this.moveLeft = false })
        this.buttonRightMobile.events.onInputOver.add(function () { this.moveRight = true })
        this.buttonRightMobile.events.onInputOut.add(function () { this.moveRight = false })

        this.buttonLeftMobile.events.onInputDown.add(function () { this.moveLeft = true })
        this.buttonLeftMobile.events.onInputUp.add(function () { this.moveLeft = false })

        this.buttonLeftMobile.events.onInputDown.add(function () { console.log(this.moveLeft) })
        this.buttonLeftMobile.events.onInputUp.add(function () { console.log(this.moveLeft) })

        // this.buttonRightMobile.events.onInputDown.add(function () { console.log(this.moveRight) })
        // this.buttonRightMobile.events.onInputUp.add(function () { console.log(this.moveRight) })

        //Fixes the buttons to the screen
        this.buttonJump.fixedToCamera = true
        this.buttonLeftMobile.fixedToCamera = true
        this.buttonRightMobile.fixedToCamera = true
    },
    gofull() { game.scale.startFullScreen(false); }
}