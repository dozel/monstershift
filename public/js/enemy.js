this.MIN_DISTANCE = 32; //pixels?

var Enemy = function(x, y, type) {
    this.init(x, y, type);
    this.target = null;
    this._target = null;
    this.chasing = false;
};


Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update  = function(){
    this.moveTo(this.target.sprite.x, this.target.sprite.y);
    return;

    if(!this.target || !this._target){
        return;
    }

    var distance = this.game.math.distance(this.x, this.y, this._target.x, this._target.y);
    if (distance < this.MIN_DISTANCE) {
        this.chasing = false;
    }

    if(this.chasing === false){
        this.chasing = true;
        if(!this.target){
            this._target.x = this.x - 5 + (Math.random() * 10);
            this._target.y = this.y - 5 + (Math.random() * 10);
        } else{
            this._target.x = this.target.x;
            this._target.y = this.target.y;
        }
    }

    this.moveTo(this._target.x, this._target.y);
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
    moveTo: function(x, y) {
        game.add.tween(this).to({
            x: x,
            y:y
        }, 0, Phaser.Easing.Linear.None, true);
    },
    setTarget: function(target){
        this.target = target;
        if(this.target.x)
            this._target = {x:target.x, y:target.y};
        if(this.target.sprite.x)
            this._target = {x:target.x, y:target.y};
    }
});
