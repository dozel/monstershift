var Enemy = function(x, y, type) {
    this.init(x, y, type);
};
Enemy.prototype = Phaser.Utils.extend(true, Phaser.Sprite.prototype, PIXI.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

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
        }, 200, Phaser.Easing.Linear.None, true);
    }
});
