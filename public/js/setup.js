var Setup = function() {
    this.beginSetup();
};
Setup.prototype.constructor = Setup;

$.extend(Setup.prototype, {
    font: function(fontSize) {
        return this.basicFont = {
            font: fontSize + "pt slkscr",
            fill: 0x000000
        };
    },
    beginSetup: function () {
        //To get the font working, stupid hack
        var label = game.add.text(200, 20, '', this.font(1));
        label.alpha = 0.0;

        this.setupCanvas();
        this.loadImages();
    },
    setupCanvas: function () {
        var canvas = $('canvas');
        var gameDiv = $('.game').addClass('contentCentered');
        var emptyDiv = $('<div>', {'class':'container'});
        emptyDiv.append(canvas);
        gameDiv.append(emptyDiv);

        game.add.text(100, 50, ' ', {});

        var title =  $('<div/>', {'class':'title'}).text("MONSTER SHIFT");
        $('body').prepend(title);
    },
    loadImages: function() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
        game.antialias = false;
        game.stage.smoothed = false;

        game.load.image('bg', 'assets/imgs/bg.png');
        game.load.image('player', 'assets/imgs/player.png');

    }
});

