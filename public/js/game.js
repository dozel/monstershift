var game = new Phaser.Game(852, 480, Phaser.CANVAS, '', { preload: preload, create: create, update: update }, false, false);
var gameGroup = game.add.group();

function preload() {
    console.log('Preload') ;
}

function create() {
    console.log('Create');
}

function update() {

}