PLAYER_DISTANCE = 400;
ROAM_DISTANCE = 100;
ROAM_SPEED = 100;
CHASE_SPEED = 200;


var Enemy = function(x, y, type) {
    this.init(x, y, type);
    this.player = null;
    this.roamPosition = null;
};


Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update  = function(){
    var playerIsClose = this.isClose(this, this.player.sprite, PLAYER_DISTANCE);
    if (playerIsClose) {
        this.roamPosition = null;
        return this.moveTo(this.player.sprite.x, this.player.sprite.y, CHASE_SPEED);
    } else{
        if(!this.roamPosition){
            var randomX = this.x - 125 + Math.floor(Math.random() * 250);
            var randomY = this.y - 125 + Math.floor(Math.random() * 250);
            this.roamPosition = {x: randomX, y: randomY};
        }
        var roamPosIsClose = this.isClose(this, this.roamPosition, ROAM_DISTANCE);
        if(roamPosIsClose){
            this.roamPosition = null;
            return;
        }
        return this.moveTo(this.roamPosition.x, this.roamPosition.y, ROAM_SPEED);
    }
}

$.extend(Enemy.prototype, {
    init: function(x, y, type) {
        this.type = type;
        var anim = false, speed = 8;
        if (this.type === 'quick') {
            type = 'qIdle';
            anim = true;
        }
        Phaser.Sprite.call(this, game, x, y, type);
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


        if (anim) {
            this.animations.add(type);
            this.animations.play(type, speed, true);
        }
    },
    moveTo: function(x, y, speed) {
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
    setPlayer: function(player){
        this.player = player;
    }
});
