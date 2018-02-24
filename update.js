var Update = function () {
    // this.gameData
}

Update.prototype = {
    init: function (payload) {
        this.player = payload.player
        // game.physics.startSystem(Phaser.Physics.ARCADE);



        debugger

    },
    create: function () {
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

    },
    update: function () {
        // console.log(`Player in update ${this.player}`)
        // console.log('hey buddy')
        // debugger
        var hitPlatform = game.physics.arcade.collide(this.player, platforms);

        this.player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        //  Allow the this.player to jump if they are touching the ground.
        if (cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
            this.player.body.velocity.y = -300;
        }
        // game.physics.arcade.collide(stars, platforms);

    }
}


