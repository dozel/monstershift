function animateLabelChange(label, preText, start, end) {
    var count = start;
    var labelInterval = setInterval(function () {
        if (count > end) {
            count--;
        }
        else {
            count++;
        }
        label.text = preText + count;
        if (count === end) {
            clearInterval(labelInterval);
        }
    }.bind(label, preText, start, end), 50);
}


function shake(image) {
    var count = 6;
    var origX = image.position.x;
    var labelInterval = setInterval(function () {
        count--;
        var changeX = count % 2 === 0 ? -5 : 5;
        image.position.x = origX + changeX;
        if (count === 0) {
            image.position.x = origX;
            clearInterval(labelInterval);
        }
    }.bind(image), 75);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}