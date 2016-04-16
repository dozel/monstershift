var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);

function preload() {
    console.log('Preload') ;
    this.setup = new Setup();
}

function create() {
    //To get the font working, stupid hack
    var label = game.add.text(200, 20, '', {
        font: "18pt slkscr",
        fill: 0x000000
    });
    label.alpha = 0.0;

    var gameWorld = game.add.group();


    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;
}

function update() {

}