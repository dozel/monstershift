var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld, actors, theBottom; //Groups
var cursors;
var setup;

function preload() {
    console.log('Preload') ;
    setup = new Setup();
    gameWorld = game.add.group();
}

function create() {
    game.world.setBounds(0,0,4000,2400);

    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;

    actors = game.add.group(gameWorld);

    this.player = new Player();
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(this.player.sprite);

    var labelX = game.add.text(15, 15, 'X:', setup.font(18));
    var labelY = game.add.text(15, 40, 'Y:', setup.font(18));
    this.labelXVal = game.add.text(50, 15, this.player.sprite.x, setup.font(18));
    this.labelYVal = game.add.text(50, 40, this.player.sprite.y, setup.font(18));

    labelX.fixedToCamera = labelY.fixedToCamera = this.labelXVal.fixedToCamera = this.labelYVal.fixedToCamera = true;

    setupEnemies();
    gameWorld.bringToTop(actors);
}

function setupEnemies() {
    var width = 250, height = 200, padding = 50;
    var randomBoxes = [];
    for (var i = 0; i < 15; i++) {
        var randomX = Math.floor(Math.random() * game.world.width - width - 2 * padding + padding);
        var randomY = Math.floor(Math.random() * game.world.width - height - 2 * padding + padding);
        randomBoxes.push({x: randomX, y: randomY});
    }
    var monsterTypes = ['quick', 'beast', 'owl'];
    this.enemies = [];

    for (var j = 0; j < randomBoxes.length; j++) {
        var box = randomBoxes[j];
        var randomSize = Math.floor(Math.random() * 7);
        var monster = monsterTypes[Math.floor(Math.random() * 3)];
        //More quicklings, and less owl bears
        if (monster === 'owl') {
            randomSize = Math.max(randomSize, 1);
        }
        else if (monster === 'quick') {
            randomSize++;
        }
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

    this.labelXVal.text = this.player.sprite.x;
    this.labelYVal.text = this.player.sprite.y;
}