var monsters = ['owl', 'beast', 'quick', 'dg'];
var codez = {'owl' : 90, 'beast': 88, 'quick': 67, 'dg': 86};
var Player = function() {
    this.init();
};
Player.prototype.constructor = Player;

$.extend(Player.prototype, {
    init: function () {
        theBottom = game.add.group(gameWorld);
        this.detection = game.add.graphics(game.world.centerX, game.world.centerY, theBottom);
        this.detection.beginFill(colors.detect, 1);
        this.detection.drawCircle(0, 0, 300);
        this.detection.alpha = 0;

        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'dgIdle', {}, actors);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.speed = 5;
        this.health = 100;
        this.holdTimer = 0;
        this.shapeshifting = false;
        this.shapeshift = 'dg';

        this.keyCodes = {};
        this.lastTyped = {};
        //setTimeout(function () {
        //    this.decHealth(50);
        //}.bind(this), 400);


        game.input.keyboard.onDownCallback = function(e) {
            console.log(e.keyCode);
            var code = e.keyCode;
            if (code === 90 || code == 88 || code == 67 || code === 86) { //Z->90, X->88, C->67, V->86
                game.add.tween(this.detection).to({
                    alpha: 1
                }, 200, Phaser.Easing.Linear.None, true);

                if (!this.lastTyped.keyCode) {
                    this.lastTyped = {keyCode: code, date: (new Date()).getTime()};
                }
                else if (this.lastTyped.keyCode === code){
                    var now = (new Date()).getTime();
                    var diff = now - this.lastTyped.date;
                    if (diff < 1000) {
                        if (!this.shapeshifting) {
                            this.shapeshifting = true;
                            this.shapeShift(code);
                        }
                    }
                }
            }
            if (code >= 37 && code <= 40) {
                if (!this.running && this.holdTimer === 0) {
                    this.setRun();
                }
                this.keyCodes[code] = true;
            }
        }.bind(this);

        game.input.keyboard.onUpCallback = function(e) {
            var code = e.keyCode;
            if (code === 90 || code == 88 || code == 67 || code === 86) { //Z->90, X->88, C->67, V->86
                if (code === this.lastTyped.keyCode) {
                    var now = (new Date()).getTime();
                    var diff = now - this.lastTyped.date;
                    if (diff > 1000) {
                        this.shapeshifting = false;
                        game.add.tween(this.detection).to({
                            alpha: 0
                        }, 200, Phaser.Easing.Linear.None, true);
                        this.lastTyped = {};
                    }
                }
                else {
                    this.shapeshifting = false;
                    game.add.tween(this.detection).to({
                        alpha: 0
                    }, 200, Phaser.Easing.Linear.None, true);
                    this.lastTyped = {};
                }
            }
            if (code >= 37 && code <= 40) {
                this.keyCodes[code] = false;
                if (!this.checkKeyDown()  && this.running) {
                    this.setIdle();
                }
            }
        }.bind(this);
        this.setIdle();
    },
    shapeShift: function(code) {
        console.log("Shapeshift");

        if (codez[this.shapeshift] !== code) {
            game.add.tween(this.sprite).to({
                tint: colors.vamp
            }, 200, Phaser.Easing.Linear.None, true);

            setTimeout(function () {
                game.add.tween(this.sprite).to({
                    tint: 0xffffff
                }, 200, Phaser.Easing.Linear.None, true);
            }.bind(this), 200);

            setTimeout(function () {
                game.add.tween(this.sprite).to({
                    tint: colors.vamp
                }, 200, Phaser.Easing.Linear.None, true);
            }.bind(this), 400);

            setTimeout(function () {
                game.add.tween(this.sprite).to({
                    tint: 0xffffff
                }, 200, Phaser.Easing.Linear.None, true);
            }.bind(this), 600);

            //Z->90, X->88, C->67
            setTimeout(function () {
                switch (code) {
                    case 90:
                        this.shapeshift = 'owl';
                        break;
                    case 88:
                        this.shapeshift = 'beast';
                        break;
                    case 67:
                        this.shapeshift = 'quick';
                        break;
                    default:
                        this.shapeshift = 'dg';
                        break;
                }
                this.setIdle();
            }.bind(this, code), 800);
        }
        this.shapeshifting = false;
        game.add.tween(this.detection).to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, true);
        this.lastTyped = {};
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
        //console.log('RUN');
        this.running = true;
        var texture;
        var speed = 8;

        switch (this.shapeshift) {
            case 'owl':
                texture = 'obRun';
                break;
            case 'beast':
                texture = 'dbRun';
                break;
            case 'quick':
                texture = 'qRun';
                break;
            case 'dg':
            default:
                texture = 'dgRun';
                break;
        }
        this.sprite.loadTexture(texture);
        this.sprite.animations.add(texture);
        this.sprite.animations.play(texture, speed, true);
    },
    setIdle: function() {
        this.running = false;
        //console.log('IDLE');
        var texture;
        var speed = 8;

        switch (this.shapeshift) {
            case 'owl':
                texture = 'obIdle';
                break;
            case 'beast':
                texture = 'dbIdle';
                break;
            case 'quick':
                texture = 'qIdle';
                break;
            case 'dg':
            default:
                texture = 'dgIdle';
                break;
        }
        this.sprite.loadTexture(texture);
        this.sprite.animations.add(texture);
        this.sprite.animations.play(texture, speed, true);
    },
    moveUp: function() {
        if (this.sprite.y - this.speed >= 0 && this.holdTimer === 0) {
            this.sprite.y -= this.speed;
            this.detection.y -= this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    moveDown: function() {
        if (this.sprite.y + this.speed + this.sprite.height <= game.world.height && this.holdTimer === 0) {
            this.sprite.y += this.speed;
            this.detection.y += this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }
    },
    moveLeft: function() {
        if (this.sprite.x - this.speed >= 0 && this.holdTimer === 0) {
            this.sprite.x -= this.speed;
            this.detection.x -= this.speed;
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
            this.sprite.scale.x = 1;
        }
    },
    moveRight: function() {
        if (this.sprite.x + this.speed + this.sprite.width <= game.world.width && this.holdTimer === 0) {
            this.sprite.x += this.speed;
            this.detection.x += this.speed
            actors.sort('bottom', Phaser.Group.SORT_ASCENDING);
            this.sprite.scale.x = -1;
        }
    },
    decHealth: function(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            //TODO: TRIGGER GAME_OVER
        }
    }
});