//connected to constrolsAndInput.js file
function PlaybackButton(yValue) {
    var stopColour, playPauseColour;
    var playbackX = 55,
        playbackY = yValue - 20,
        playbackWidth = 20,
        playbackHeight = 20,
        playbackStopX = playbackX + playbackWidth + 20;

    //for volume gui (connected to sketch.js file)
    this.playbackX = playbackX;
    this.playbackWidth = playbackWidth;

    //for cursor changes
    this.withinPlayPause = false;
    this.withinStop = false;

    this.draw = function () {
        this.checkIfCursorWithinSymbol(); //set requirements
        this.playbackHoverEffect();
        strokeWeight(1);
        //play/pause symbol
        if (!chosenMusic.isPlaying()) {
            //play symbol
            fill(playPauseColour);
            triangle(playbackX, playbackY, playbackX + playbackWidth, playbackY + playbackHeight / 2, playbackX, playbackY + playbackHeight);
        } else {
            //pause symbol
            fill(playPauseColour);
            rect(playbackX, playbackY, playbackWidth / 2 - 2, playbackHeight);
            rect(playbackX + (playbackWidth / 2 + 2), playbackY, playbackWidth / 2 - 2, playbackHeight);
        }
        //stop symbol
        fill(stopColour);
        rect(playbackStopX, playbackY, playbackWidth, playbackHeight);
    };

    this.hitCheck = function () {
        this.checkIfCursorWithinSymbol(); //set requirements
        //play/pause symbol
        if (this.withinPlayPause) {
            if (chosenMusic.isPlaying()) {
                chosenMusic.pause();
            } else {
                chosenMusic.play();
            }
        }
        //stop symbol
        if (this.withinStop) {
            chosenMusic.stop();
        }
    };

    //needs to be a "this." function to use "this.withinPlayPause" variable for cursor changes
    this.playbackHoverEffect = function () {
        //play/pause symbol
        if (this.withinPlayPause) {
            playPauseColour = color(255);
        } else {
            playPauseColour = translucent.white100;
        }
        //stop symbol
        if (this.withinStop) {
            stopColour = color(255);
        } else {
            stopColour = translucent.white100;
        }
    };

    this.checkIfCursorWithinSymbol = function () {
        //play/pause symbol
        if (mouseX >= playbackX && mouseX <= playbackX + playbackWidth && mouseY >= playbackY && mouseY <= playbackY + playbackHeight) {
            this.withinPlayPause = true;
        } else {
            this.withinPlayPause = false;
        }
        //stop symbol
        if (mouseX >= playbackStopX && mouseX <= playbackStopX + playbackWidth && mouseY >= playbackY && mouseY <= playbackY + playbackHeight) {
            this.withinStop = true;
        } else {
            this.withinStop = false;
        }
    };
}
