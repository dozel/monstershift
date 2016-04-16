var Player = function() {
    this.init();
};
Player.prototype.constructor = Player;

$.extend(Player.prototype, {
    init: function () {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player', {}, gameWorld);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.smoothed = false;
    }
});

