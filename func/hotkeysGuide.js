//connected to controlsAndInput.js file
function HotkeysGuide() {
    var drawHotkeysGuide = true;

    this.toggleHotkeysGuide = function () {
        drawHotkeysGuide = !drawHotkeysGuide;
    };

    this.draw = function () {
        if (drawHotkeysGuide) {
            //background
            fill(translucent.black200);
            noStroke();
            var rectW = 320; //this is a hard value! must manually change based on its text
            var rectH = 440; //this is a hard value! must manually change based on its text
            var rectX = width / 2 - rectW / 2;
            var rectY = height / 2 - rectH / 2;
            rect(rectX, rectY, rectW, rectH);
            //title header text
            var totalNumberOfTextLines = 16 - 1.5; //(number of "\n" - 1.5) or manually count the number of lines
            var textY = height / 2 - textSizeDefault * (totalNumberOfTextLines / 2);
            fill("lightgreen");
            myStrokeSettings();
            textAlign(CENTER);
            textSize(textSizeDefault);
            textStyle(BOLD);
            text("Hotkeys Guide", width / 2, textY);
            //what keyboard buttons
            var spaceBetween = 120;
            fill("white");
            textAlign(LEFT);
            textStyle(NORMAL);
            text("\n\nH:\nG:\nF:\nM:\n\nSpace:\nN:\nB:", width / 2 - spaceBetween, textY);
            //what does the buttons do
            textAlign(RIGHT);
            text("\n\nhotkeys guide\nGUI\nfullscreen\nmenu\n\nplay / pause\nnext\nback", width / 2 + spaceBetween, textY);
            //disclaimer
            fill("red");
            textAlign(CENTER);
            textSize(textSizeSmall);
            text("\n\n\n\n\n\n\n\n\n\n\n\n\n\nafter switching music,\nwait for timestamp to show\nits duration first", width / 2, textY);
            textAlign(LEFT); //reset to default
        }
    };
}
