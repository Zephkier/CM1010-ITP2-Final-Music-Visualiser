//connected to constrolsAndInput.js file
function PlaybarTimestampAndTitle() {
    var playbarHeight = 15,
        drawPlaybarWorksText = true;

    this.togglePlaybarWorksText = function () {
        drawPlaybarWorksText = false;
    };

    this.draw = function () {
        textStyle(NORMAL);
        //"playbar works!" text
        if (drawPlaybarWorksText) {
            fill("white");
            myStrokeSettings();
            textSize(textSizeDefault);
            textAlign(CENTER);
            text("|", width / 2, 45);
            text("^\nthis playbar works!", width / 2, 40);
            textAlign(LEFT); //reset to default
        }
        //playbar background
        fill(translucent.white50);
        noStroke();
        rect(0, 0, width, playbarHeight);
        //playbar foreground
        fill(translucent.white100);
        var playbarWidth = map(chosenMusic.currentTime(), 0, chosenMusic.duration(), 0, width);
        rect(0, 0, playbarWidth, playbarHeight);
        //playbar foreground adjustable
        if (this.checkIfCursorWithinPlaybar()) {
            fill(translucent.white150);
            rect(0, 0, mouseX, playbarHeight);
        }
        //timestamp corner, timestamp hovering, and music titles
        this.drawTimestampAndTitle();
    };

    this.drawTimestampAndTitle = function () {
        //timestamp corner
        fill("white");
        myStrokeSettings();
        textSize(textSizeDefault);
        textStyle(NORMAL);
        var currentMin = floor(chosenMusic.currentTime() / 60);
        var currentSec = floor(chosenMusic.currentTime() % 60);
        var totalDurationMinOnly = floor(chosenMusic.duration() / 60);
        var totalDurationSecOnly = floor(chosenMusic.duration() % 60);
        text(nf(currentMin, 2) + ":" + nf(currentSec, 2) + " / " + nf(totalDurationMinOnly, 2) + ":" + nf(totalDurationSecOnly, 2), width - textWidth("00:00 / 00:00") - 20, controlsAndInput.textHeight);
        //music title (back, main, next)
        var titleYMain = controlsAndInput.textHeight + textSizeDefault * 2.5,
            titleYBack = titleYMain - textSizeSmall - 15,
            titleYNext = titleYMain + textSizeSmall + 10;
        fill("grey");
        textSize(textSizeSmall);
        text(
            musicOptions[(chosenMusicIndex - 1 + musicOptions.length) % musicOptions.length] + " [back]", //format
            width - 20 - textWidth(musicOptions[(chosenMusicIndex - 1 + musicOptions.length) % musicOptions.length]) - textWidth(" [back]"),
            titleYBack
        );
        fill("white");
        textSize(textSizeDefault);
        text(
            musicOptions[chosenMusicIndex], //format
            width - 20 - textWidth(musicOptions[chosenMusicIndex]),
            titleYMain
        );
        fill("grey");
        textSize(textSizeSmall);
        text(
            musicOptions[(chosenMusicIndex + 1) % musicOptions.length] + " [next]", //format
            width - 20 - textWidth(musicOptions[(chosenMusicIndex + 1) % musicOptions.length]) - textWidth(" [next]"),
            titleYNext
        );
        //timestamp hovering
        if (this.checkIfCursorWithinPlaybar()) {
            //background
            fill(translucent.black200);
            noStroke();
            var vertSpacing = 25;
            textSize(textSizeDefault); //need this so that "textWidth()" works properly
            rect(mouseX - 25, mouseY + vertSpacing, textWidth("00:00") - 5, 28);
            //text
            fill("white");
            textSize(textSizeSmall);
            var totalDurationInSec = totalDurationMinOnly * 60 + totalDurationSecOnly;
            var hoverTimestamp = map(mouseX, 0, width, 0, totalDurationInSec);
            var hoverMin = floor(hoverTimestamp / 60);
            var hoverSec = floor(hoverTimestamp % 60);
            text(nf(hoverMin, 2) + ":" + nf(hoverSec, 2), mouseX - 20, mouseY + vertSpacing + 20);
        }
    };

    this.jumpToHere = function () {
        if (this.checkIfCursorWithinPlaybar()) {
            var jumpTime = map(mouseX, 0, width, 0, chosenMusic.duration());
            if (chosenMusic.isPlaying()) {
                chosenMusic.jump(jumpTime);
            } else {
                chosenMusic.play();
                chosenMusic.jump(jumpTime); //p5js limitation: "chosenMusic.jump()"  works only when music is playing
            }
        }
    };

    this.checkIfCursorWithinPlaybar = function () {
        //using "<=" or ">=" causes a bug where timestamp hovering still shows when mouse exits canvas via the top
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < playbarHeight + 1) {
            return true;
        } else {
            return false;
        }
    };
}
