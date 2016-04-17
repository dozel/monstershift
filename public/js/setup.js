var colors = {
    detect: 0xf1e5d3,
    vamp: 0xff7260,
    wolf: 0x43869f,
    zomb: 0x505050,
    player: 0xe5c395
};

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

        game.load.spritesheet('dgIdle', 'assets/imgs/dg_idle_sheet.png', 128, 128, 8);
        game.load.spritesheet('dgRun', 'assets/imgs/dg_walk_sheet.png', 128, 128, 4);

        game.load.spritesheet('qIdle', 'assets/imgs/quick_idle_sheet.png', 128, 128, 6);
        game.load.spritesheet('qRun', 'assets/imgs/quick_run_sheet.png', 128, 128, 4);

        game.load.spritesheet('obIdle', 'assets/imgs/owlbear_idle_sheet.png', 192, 192, 13);
        game.load.spritesheet('obRun', 'assets/imgs/owlbear_run_sheet.png', 192, 192, 4);

        game.load.spritesheet('dbIdle', 'assets/imgs/db_idle_sheet.png', 192, 192, 15);
        game.load.spritesheet('dbRun', 'assets/imgs/db_run_sheet.png', 192, 192, 4);
    }
});
