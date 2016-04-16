var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld;
var cursors;
var setup;

function preload() {
    console.log('Preload') ;
    setup = new Setup();
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
    game.camera.follow(this.player.healthBg);

    var labelX = game.add.text(15, 15, 'X:', setup.font(18));
    var labelY = game.add.text(15, 40, 'Y:', setup.font(18));
    this.labelXVal = game.add.text(50, 15, this.player.healthBg.x, setup.font(18));
    this.labelYVal = game.add.text(50, 40, this.player.healthBg.y, setup.font(18));

    labelX.fixedToCamera = labelY.fixedToCamera = this.labelXVal.fixedToCamera = this.labelYVal.fixedToCamera = true;

    setupEnemies();
}

function setupEnemies() {
    var width = 250, height = 200, padding = 50;
    var randomBoxes = [];
    for (var i = 0; i < 15; i++) {
        var randomX = Math.floor(Math.random() * game.world.width - width - 2 * padding + padding);
        var randomY = Math.floor(Math.random() * game.world.width - height - 2 * padding + padding);
        randomBoxes.push({x: randomX, y: randomY});
    }
    var monsterTypes = ['vamp', 'wolf', 'zomb'];
    this.enemies = [];

    for (var j = 0; j < randomBoxes.length; j++) {
        var box = randomBoxes[j];
        var randomSize = Math.floor(Math.random() * 7);
        var monster = monsterTypes[Math.floor(Math.random() * 3)];
        for (var k = 0; k < randomSize; k++) {
            var pos = randomPos(box.x, box.y, width, height);
            var enemy = new Enemy(pos.x, pos.y, monster);
            enemy.groupId = j;
            enemy.tag = this.enemies.length;
            this.enemies.push(enemy);
        }
    }
}

function randomPos(x, y, width, height) {
    var newX = Math.floor(Math.random() * width + x);
    var newY = Math.floor(Math.random() * height + y);
    return {x: newX, y: newY};
}

function update() {
    if (cursors.up.isDown) {
        this.player.moveUp();
    }
    else if (cursors.down.isDown) {
        this.player.moveDown();
    }

    if (cursors.left.isDown) {
        this.player.moveLeft();
    }
    else if (cursors.right.isDown) {
        this.player.moveRight();
    }

    this.labelXVal.text = this.player.healthBg.x;
    this.labelYVal.text = this.player.healthBg.y;
}