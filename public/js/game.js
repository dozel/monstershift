var game = new Phaser.Game(800, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameWorld, actors, theBottom; //Groups
var cursors;
var setup;
game.started = false;
game.restarting = false;
var music, introBg, endBg;
var introInterval;

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
    game.restarting = true;
    game.started = game.gameOver = false;
    game.state.restart();
}

function create() {
    console.log('CREATE') ;

    if (game.restarting) {
        actors = game.add.group(gameWorld);
        startGame();
        game.restarting = false;
        return;
    }

    //
    music = game.add.audio('intro');
    music.play("",0,1.0,true);

    introBg = game.add.graphics(0, 0);
    introBg.beginFill(0x000000, 1);
    introBg.drawRect(0, 0, 800 * 1.25, 480 * 1.25);
    introBg.fixedToCamera = true;

    var background = game.add.sprite(0, 0, 'intro', {});
    background.smoothed = false;

    var labelBegin = game.add.text(game.world.width / 2, game.world.height - 100, 'PRESS Z TO START!', {
        font: "20pt slkscr",
        fill: 0x000000
    });

    introInterval = setInterval (function() {
        for (var i = 0; i < labelBegin.text.length + 1; i++) {
            (function(e) {
                setTimeout(function() {
                    if (e > 0) {
                        labelBegin.addColor("#000000", e - 1);
                    }
                    labelBegin.addColor("#ffffff", e);
                }, e * 50);
            })(i);
        }
    }.bind(labelBegin), 5000);

    actors = game.add.group(gameWorld);


    game.input.keyboard.onUpCallback = function(e) {
        var code = e.keyCode;
        if (code === 90 && !game.started) {
            clearInterval(introInterval);
            music.fadeOut(400);
            this.tween1 = game.add.tween(labelBegin).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, true);
            this.tween2 = game.add.tween(background).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, true);
            this.tween1.onComplete.add(function () {
                startGame();
            }.bind(this), this);
        }
    }.bind(this);
}

function startGame() {
    game.started = true;

    game.world.setBounds(0,0,4000,2400);


    var scale = 0.8;
    if(ZOOM_OUT){
        scale = 0.2;
    }
    game.world.scale.x = game.world.scale.y = scale;


    game.camera.x = game.world.centerX - 800;
    game.camera.y = game.world.centerY - 480;


    var background = game.add.sprite(0, 0, 'bg', {}, gameWorld);
    background.x = (game.world.width - background.width) / 2;
    background.y = (game.world.height - background.height) / 2;
    background.smoothed = false;

    player = new Player();
    player.setGameOver = setGameOver.bind(this, false);
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player.sprite);

    setupEnemies(player);
    placeSpaceShip(player);
    gameWorld.bringToTop(actors);

    if (!game.restarting) {
        game.add.tween(introBg).to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, true);
    }


    music = game.add.audio('song');
    setTimeout(function() {
        music.play("",0,1.0,true);
    }, 400);
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
            //enemy.setGameOver = setGameOver.bind(this, false);
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


    if (!game.restarting) {
        spaceShip.alpha = 0;
        setTimeout(function () {
            spaceShip.alpha = 1;
        }.bind(spaceShip), 200);
    }



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
    player.setIdle();

    var bg = game.add.graphics(0, 0);
    bg.beginFill(0x000000, 1);
    bg.drawRect(0, 0, 800 * 1.25, 480 * 1.25);
    bg.fixedToCamera = true;

    var texture = win ? 'best' : 'worst';
    var result = game.add.sprite(0, 0, texture, {});
    result.fixedToCamera = true;
    result.scale.setTo(1.25, 1.25);

    game.input.keyboard.onDownCallback = function(e) {
        var code = e.keyCode;
        if (code === 90) {
            this.restartTween = game.add.tween(result).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, true);
            this.restartTween.onComplete.add(function () {
                game.add.tween(bg).to({
                    alpha: 0
                }, 200, Phaser.Easing.Linear.None, true);
                result.destroy();
                music.stop();
                restartGame();
            }.bind(this), this);
        }
    }.bind(this);

    game.gameOver = true;
}
