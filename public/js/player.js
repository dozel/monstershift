var Player = function() {
    this.init();
};
Player.prototype.constructor = Player;

$.extend(Player.prototype, {
    init: function () {
        this.detection = game.add.graphics(game.world.centerX, game.world.centerY, gameWorld);
        this.detection.beginFill(0xf1e5d3, 1);
        this.detection.drawCircle(0, 0, 300);
        this.detection.alpha = 0;

        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'dgIdle', {}, actors);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.speed = 5;
        this.health = 100;
        this.holdTimer = 0;
        this.shapeshifting = false;

        this.keyCodes = {};
        //setTimeout(function () {
        //    this.decHealth(50);
        //}.bind(this), 400);

        game.input.keyboard.onDownCallback = function(e) {
            var code = e.keyCode;
            if (code === 90) { //Z on keyboard.
                this.holdTimer++;
                if (this.holdTimer > 15) {
                    //TODO: SHAPESHIFT
                    if (!this.shapeshifting) {
                        this.shapeshifting = true;
                        console.log("Shapeshift");
                    }
                }
            }
            else if (code >= 37 && code <= 40) {
                this.setRun();
                this.keyCodes[code] = true;
            }
        }.bind(this);

        game.input.keyboard.onUpCallback = function(e) {
            var code = e.keyCode;
            if (e.keyCode === 90) { //Z on keyboard.
                this.holdTimer = 0;
                this.shapeshifting = false;
            }
            else if (code >= 37 && code <= 40) {
                this.keyCodes[code] = false;
                if (!this.checkKeyDown) {
                    this.setIdle();
                }
            }
        }.bind(this);
        this.setIdle();
    },
    checkKeyDown: function() {
        for (var key in this.keyCodes) {
            if (this.keyCodes[key]) {
                return true;
            }
        }
        return false;
    },
    setRun: function () {
        this.sprite.loadTexture('dgRun');
        this.sprite.animations.add('dgRun');
        this.sprite.animations.play('dgRun', 8, true);
    },
    setIdle: function() {
        this.sprite.loadTexture('dgIdle');
        this.sprite.animations.add('dgIdle');
        this.sprite.animations.play('dgIdle', 8, true);
    },
    moveUp: function() {
        if (this.sprite.y - this.speed >= 0) {
            this.sprite.y -= this.speed;
            this.detection.y -= this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    moveDown: function() {
        if (this.sprite.y + this.speed + this.sprite.height <= game.world.height) {
            this.sprite.y += this.speed;
            this.detection.y += this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    moveLeft: function() {
        if (this.sprite.x - this.speed >= 0) {
            this.sprite.x -= this.speed;
            this.detection.x -= this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    moveRight: function() {
        if (this.sprite.x + this.speed + this.sprite.width <= game.world.width) {
            this.sprite.x += this.speed;
            this.detection.x += this.speed
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    decHealth: function(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            //TODO: TRIGGER GAME_OVER
        }
    }
});