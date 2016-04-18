PLAYER_DISTANCE = 300;
CAPTURE_DISTANCE = 50;
ROAM_DISTANCE = 100;
ROAM_SPEED = 100;
CHASE_SPEED = 200;
IDLE_TIME = 1200;

var Enemy = function(x, y, type) {
    this.init(x, y, type);
    this.player = null;
    this.roamPosition = null;
    this.idleStarted = 0;
};

var runTextures = {
    'owl': 'obRun',
    'beast': 'dbRun',
    'quick': 'qRun'
};
var idleTextures = {
    'owl': 'obIdle',
    'beast': 'dbIdle',
    'quick': 'qIdle'
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update  = function(){
    if(game.gameOver){
        return; 
    }
    var playerIsClose = this.isClose(this, this.player.sprite, PLAYER_DISTANCE);
    var playerIsCapured = this.isClose(this, this.player.sprite, CAPTURE_DISTANCE);
    var sameType = (this.beastType === this.player.shapeshift);
    if (playerIsClose && !sameType) {
        if(!playerIsCapured){
            this.roamPosition = null;
            return this.moveTo(this.player.sprite.x, this.player.sprite.y, CHASE_SPEED);
        }
        else{
            console.log("GOTCHA BITCH");
            this.setGameOver();
        }
    } else if(this.idleStarted){
        if(game.time.now - this.idleStarted > IDLE_TIME){
            this.idleStarted = 0;
        }
        return;
    }
    else {
        if(!this.roamPosition){
            var randomX = this.x - 300 + Math.floor(Math.random() * 600);
            var randomY = this.y - 300 + Math.floor(Math.random() * 600);
            this.roamPosition = {x: randomX, y: randomY};
        }
        var roamPosIsClose = this.isClose(this, this.roamPosition, ROAM_DISTANCE);
        if(roamPosIsClose){
            this.stopMoving();
            this.roamPosition = null;
            this.idleStarted = game.time.now;
            return;
        }
        return this.moveTo(this.roamPosition.x, this.roamPosition.y, ROAM_SPEED);
    }
}

$.extend(Enemy.prototype, {
    stopMoving: function(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.setIdleAnimation();
    },
    init: function(x, y, type) {
        this.type = type;
        this.beastType = type;
        console.log('enemy Type is:', this.type);
        var speed = 8;
        var texture = idleTextures[this.type];
        Phaser.Sprite.call(this, game, x, y, texture);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        game.add.existing(this);
        actors.add(this);

        this.anchor.setTo(0.5, 0.5);

        if (x > game.world.width / 2) {
            this.scale.x = 1;
        }
        else {
            this.scale.x = -1;
        }

        this.idleStarted = game.time.now;
        this.setIdleAnimation();
    },
    moveTo: function(x, y, speed) {
        if (x < this.x) {
            this.scale.x = 1;
        }
        else {
            this.scale.x = -1;
        }
        if(this.body.velocity.x === 0 && this.body.velocity.y === 0){
            this.setRunAnimation();
        }
        var rotation = this.game.math.angleBetween(this.x, this.y, x, y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * speed;
        this.body.velocity.y = Math.sin(rotation) * speed;
    },
    isClose: function(a, b, minDistance){
        var distance = this.game.math.distance(a.x, a.y, b.x, b.y);
        var tooClose = (distance < minDistance);
        return tooClose;
    },
    setIdleAnimation: function(){
        var speed = 8;
        var texture = idleTextures[this.beastType];
        this.loadTexture(texture);
        this.animations.add(texture);
        this.animations.play(texture, speed, true);
    },
    setRunAnimation: function(){
        var speed = 8;
        var texture = runTextures[this.beastType];
        this.loadTexture(texture);
        this.animations.add(texture);
        this.animations.play(texture, speed, true);
    },
    setPlayer: function(player){
        this.player = player;
    }
});
