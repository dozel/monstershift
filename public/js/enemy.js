var Enemy = function(x, y, type) {
    this.init(x, y, type);
};
Enemy.prototype.constructor = Enemy;

$.extend(Enemy.prototype, {
    init: function(x, y, type) {
        this.type = type;
        this.sprite = game.add.sprite(x, y, type, {}, actors);
        this.sprite.anchor.setTo(0.5, 0.5);
    },
    moveTo: function(x, y) {
        game.add.tween(this.sprite).to({
            x: x,
            y:y
        }, 200, Phaser.Easing.Linear.None, true);
    }
});

