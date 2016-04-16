var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld;
var cursors;

function preload() {
    console.log('Preload') ;
    this.setup = new Setup();
}

function create() {
    game.world.setBounds(0,0,4000,2400);

    gameWorld = game.add.group();

    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;

    this.player = new Player();
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(this.player.sprite);

    var labelX = game.add.text(15, 15, 'X:', this.setup.font(18));
    var labelY = game.add.text(15, 40, 'Y:', this.setup.font(18));
    this.labelXVal = game.add.text(50, 15, this.player.sprite.x, this.setup.font(18));
    this.labelYVal = game.add.text(50, 40, this.player.sprite.y, this.setup.font(18));

    labelX.fixedToCamera = labelY.fixedToCamera = this.labelXVal.fixedToCamera = this.labelYVal.fixedToCamera = true;
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
    this.labelXVal.text = this.player.sprite.x;
    this.labelYVal.text = this.player.sprite.y;
}