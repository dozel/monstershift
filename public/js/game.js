var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld;
var cursors;

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

    game.world.setBounds(0,0,4000,2400);

    gameWorld = game.add.group();

    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;

    this.player = new Player();
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(this.player.sprite);
}

function update() {
    if (cursors.up.isDown) {
        console.log('up:' + this.player.sprite.y);
        this.player.sprite.y -= 5;
    }
    else if (cursors.down.isDown) {
        console.log('down:' + this.player.sprite.y);
        this.player.sprite.y += 5;
    }

    if (cursors.left.isDown) {
        console.log('left:' + this.player.sprite.x);
        this.player.sprite.x -= 5;
    }
    else if (cursors.right.isDown) {
        console.log('right:' + this.player.sprite.x);
        this.player.sprite.x += 5;
    }

}