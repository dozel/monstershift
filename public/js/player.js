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

        this.healthBar = game.add.sprite(game.world.centerX, game.world.centerY, 'player', {}, gameWorld);
        this.healthBar.anchor.setTo(0.5, 0.5);

        this.healthBg = game.add.graphics(this.healthBar.x - this.healthBar.width / 2, this.healthBar.y - this.healthBar.height / 2);
        this.healthBg.beginFill(0x665441, 1);
        this.healthBg.drawRect(0, 0, this.healthBar.width, this.healthBar.height);
        gameWorld.add(this.healthBg);

        this.healthBar.bringToTop();

        this.speed = 5;
        this.health = 100;
        this.holdTimer = 0;
        this.shapeshifting = false;
        //setTimeout(function () {
        //    this.decHealth(50);
        //}.bind(this), 400);

        game.input.keyboard.onDownCallback = function(e) {
            if (e.keyCode === 90) { //Z on keyboard.
                this.holdTimer++;
                if (this.holdTimer > 15) {
                    //TODO: SHAPESHIFT
                    if (!this.shapeshifting) {
                        this.shapeshifting = true;
                        console.log("Shapeshift");
                    }
                }
            }
        }.bind(this);

        game.input.keyboard.onUpCallback = function(e) {
            if (e.keyCode === 90) { //Z on keyboard.
                this.holdTimer = 0;
                this.shapeshifting = false;
            }
        }.bind(this);
    },
    moveUp: function() {
        if (this.healthBg.y - this.speed >= 0) {
            this.healthBg.y -= this.speed;
            this.healthBar.y   -= this.speed;
            this.detection.y -= this.speed;
        }
    },
    moveDown: function() {
        if (this.healthBg.y + this.speed + this.healthBg.graphicsData[0].shape.height <= game.world.height) {
            this.healthBg.y += this.speed;
            this.healthBar.y   += this.speed;
            this.detection.y += this.speed;
        }
    },
    moveLeft: function() {
        if (this.healthBg.x - this.speed >= 0) {
            this.healthBg.x -= this.speed;
            this.healthBar.x   -= this.speed;
            this.detection.x -= this.speed;
        }
    },
    moveRight: function() {
        if (this.healthBg.x + this.speed + this.healthBg.graphicsData[0].shape.width <= game.world.width) {
            this.healthBg.x += this.speed;
            this.healthBar.x += this.speed;
            this.detection.x += this.speed
        }
    },
    decHealth: function(amount) {
        this.health -= amount;
        this.healthBar.height = this.healthBg.graphicsData[0].shape.height * this.healthBar / 100;
        this.healthBar.y += (this.healthBg.graphicsData[0].shape.height - this.healthBar.height) / 2;

        if (this.health <= 0) {
            //TODO: TRIGGER GAME_OVER
        }
    }
});