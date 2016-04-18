var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld, actors, theBottom; //Groups
var cursors;
var setup;
game.started = false;
var music;

var ZOOM_OUT        = false;
var MAX_HERDS       = 10;
var MAX_HERD_SIZE   = 10;
var player;

function preload() {
    console.log('Preload') ;
    setup = new Setup();
    gameWorld = game.add.group();
}

function restartGame() {
    game.started = game.gameOver = false;
    game.state.restart();
}

function create() {
    console.log('CREATE') ;
    game.world.setBounds(0,0,4000,2400);
    var scale = 0.8;
    if(ZOOM_OUT){
        scale = 0.2;
    }
    game.world.scale.x = game.world.scale.y = scale;

    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;

    var labelBegin = game.add.text(0, 0, 'PRESS Z TO START!', {
        font: "30pt slkscr",
        fill: 0x000000,
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    });
    labelBegin.x = game.world.centerX - labelBegin.width;
    labelBegin.y = game.world.centerY + 50;
    labelBegin.setTextBounds(0, 0, 800, 50);


    actors = game.add.group(gameWorld);

    player = new Player();
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player.sprite);

    game.input.keyboard.onUpCallback = function(e) {
        var code = e.keyCode;
        if (code === 90 && !game.started) {
            labelBegin.alpha = 0;
            startGame();
        }
    }.bind(this);
}

function startGame() {
    game.started = true;

    setupEnemies(player);
    placeSpaceShip(player);
    gameWorld.bringToTop(actors);

    music = game.add.audio('song');
    music.play("",0,0.5,true);
}

function setupEnemies(player) {
    var width = 250, height = 200, padding = 50;
    var herds = []; //Groups of same types of enemies
    for (var i = 0; i < MAX_HERDS; i++) {
        while(true){
            var randomX = Math.floor(Math.random() * game.world.width - width - (2 * padding));
            var randomY = Math.floor(Math.random() * game.world.height - height - (2 * padding));
            var herd = {x: randomX, y: randomY};
            if(!player.isClose(player.sprite, herd, 400)){
                break;
            }
        }
        herds.push({x: randomX, y: randomY});
    }
    var monsterTypes = ['quick', 'beast', 'owl'];
    this.enemies = [];

    for (var j = 0; j < herds.length; j++) {
        var box = herds[j];
        var randomSize = Math.floor(Math.random() * MAX_HERD_SIZE);
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
            enemy.setPlayer(player);
            enemy.setGameOver = setGameOver.bind(this, false);
        }
    }
}

function placeSpaceShip(player){
    game.world.setBounds(0,0,4000,2400);
    var x = Math.floor(Math.random() * (4000 - 100));
    var y = Math.floor(Math.random() * (2400 - 100))

    var texture = 'spaceShip';

    var spaceShip = game.add.sprite(x, y, texture);
    spaceShip.anchor.setTo(0.5, 0.5);



    player.spaceShip = spaceShip;
}


function randomPos(x, y, width, height) {
    var newX = Math.floor(Math.random() * width + x);
    var newY = Math.floor(Math.random() * height + y);
    return {x: newX, y: newY};
}

function update() {
    if (game.started) {
        if (game.gameOver) {
            return;
        }
        if (player.foundSpaceShip()) {
            setGameOver(true);
        }
        if (cursors.up.isDown) {
            player.moveUp();
        }
        else if (cursors.down.isDown) {
            player.moveDown();
        }

        if (cursors.left.isDown) {
            player.moveLeft();
        }
        else if (cursors.right.isDown) {
            player.moveRight();
        }
    }
}

function setGameOver(win) {
    var text;
    if (win) {
        text = 'YOU HAVE BESTED THE MONSTERS! CONGRATS!'
    }
    else {
        text = "YOU BECOME SOMEONE'S DINNER... :( ";
    }
    player.setIdle();
    var rectangle = game.add.graphics(0, 0);
    rectangle.beginFill(0x000000, 0.8);
    rectangle.bounds = new PIXI.RoundedRectangle(0, 0, game.world.width, game.world.height);
    rectangle.drawRect(0, 0, game.world.width, game.world.height);

    var label = game.add.text(0, 50, text, {
        font: "30pt slkscr",
        fill: "#FFFFFF",
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    });
    label.fixedToCamera = true;
    label.setTextBounds(0, 0, 800, 50);

    var labelRestart = game.add.text(0, 150, 'PRESS Z TO RESTART.', {
        font: "30pt slkscr",
        fill: "#FFFFFF",
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    });
    labelRestart.setTextBounds(0, 0, 800, 50);
    labelRestart.fixedToCamera = true;

    game.input.keyboard.onUpCallback = function(e) {
        var code = e.keyCode;
        if (code === 90) {
            music.stop();
            restartGame();
        }
    }.bind(this);

    game.gameOver = true;
}
