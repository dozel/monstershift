var HealthBar = function(x, y, width, height) {
    this.init(x, y, width, height);
};
HealthBar.prototype.constructor = HealthBar;

$.extend(HealthBar.prototype, {
    init: function(x, y, width, height) {
        var label = game.add.text(x, y, 'HEALTH:', {
            font: "20pt slkscr",
            fill: 0xFFFFFF
        });
        label.fixedToCamera = true;

        this.healthBg = game.add.graphics(x  + 50, y - 2);
        this.healthBg.beginFill(colors.healthBg, 1);
        this.healthBg.drawRect(x  + 50, y - 2, width, height);
        this.healthBg.fixedToCamera = true;

        this.healthBar = game.add.graphics(x + 50, y - 2);
        this.healthBar.beginFill(colors.vamp, 1);
        this.healthBar.drawRect(x  + 50, y - 2, width, height);
        this.healthBar.fixedToCamera = true;
    },
    decHealth: function(newHealth) {
        var newWidth = this.healthBg.graphicsData[0].shape.width * newHealth / 100;
        var newX = (this.healthBg.graphicsData[0].shape.width - this.healthBar.width) / 2;
        game.add.tween(this.healthBar.graphicsData[0].shape).to({
            width: newWidth
        }, 200, Phaser.Easing.Linear.None, true);
    }
});
