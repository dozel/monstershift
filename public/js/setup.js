var Setup = function() {
    this.beginSetup();
};
Setup.prototype.constructor = Setup;

$.extend(Setup.prototype, {
    beginSetup: function () {
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

        var title =  $('<div/>', {'class':'title'}).text("DON'T GET TOO DRUNK");
        $('body').prepend(title);
    },
    loadImages: function() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
        game.antialias = false;
        game.stage.smoothed = false;


    }
});

