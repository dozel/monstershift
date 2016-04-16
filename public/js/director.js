var Director = function() {
    this.init();
};
Director.prototype.constructor = Director;

$.extend(Director.prototype, {
    init: function () {

        this.setupGame();
    },
    setupGame: function() {

    }
});