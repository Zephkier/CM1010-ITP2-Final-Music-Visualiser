//for gui purposes: global variables, but only specific to this
var circleSize = 200,
    backgroundDotSize = 100,
    backgroundDotThreshold = 50,
    flashingBackgroundDot = false,
    flashingCircle = false,
    fillCircle = false,
    customColourForBoth = "#ffffff";

//contructor function for this
function WavePattern() {
    this.name = "Wave Pattern (Improved)";
    this.circleMinRad = circleSize - 50;
    this.circleMaxRad = circleSize + 50;

    /*
    ASSISTANCE START:
    - inspo from Coursera's ITP1 Week 19, 10.202 video about creating particles and that it is also our first introduction to any particle system
    - inspo from particle system demo on p5js' website @ https://p5js.org/examples/simulate-particle-system.html
    - inspo from YouTube video @ https://www.youtube.com/watch?v=uk96O7N1Yo0&ab_channel=ColorfulCoding
    */
    var dots = [];
    this.draw = function () {
        //background dots
        push();
        translate(width / 2, height / 2); //(0, 0) is now the center until "pop()" is called
        var spectrum = fft.analyze(); //returns an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
        var energyLevel = fft.getEnergy("lowMid"); //must use ".analyze()" first, then this returns a value from 0 to 255
        var dot = new DotConstructor();
        dots.push(dot);
        for (var i = dots.length - 1; i >= 0; i--) {
            dots[i].updateDot(energyLevel > (backgroundDotThreshold / 100) * 255);
            dots[i].drawDot();
            if (dots[i].reachEdge()) {
                dots.splice(i, 1);
            }
        }
        //circle waveform
        this.colourFlashEffect();
        strokeWeight(5);
        var wave = fft.waveform(); //returns an array of 1024 elements (each valued from -1 to 1) of CURRENT audio
        //-1 for left half of circle, 1 for right half of circle
        for (var side = -1; side <= 1; side += 2) {
            beginShape();
            for (var i = 0; i <= 180; i += 2) {
                var mappedIndex = floor(map(i, 0, 180, 0, wave.length - 1));
                var mappedR = map(wave[mappedIndex], -1, 1, circleSize - 50, circleSize + 50);
                var mappedX = mappedR * sin(i) * side;
                var mappedY = mappedR * cos(i);
                vertex(mappedX, mappedY);
            }
            endShape();
        }
        pop(); //(0, 0) reset to default
    };
    //ASSISTANCE END

    var startCol = "white";
    this.newCol = startCol; //1) start with white colour, 2) read comment @ last line of this function, 3) start and draw with new colour, repeat from "2)"
    this.colourFlashEffect = function () {
        var spectrum = fft.analyze(); //returns an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
        if (detector.detectBeat(spectrum)) {
            this.newCol = color(random(255), random(255), random(255));
        }
        if (flashingCircle) {
            stroke(this.newCol);
            if (fillCircle) {
                fill(this.newCol);
            } else {
                noFill();
            }
        } else {
            stroke(customColourForBoth);
            if (fillCircle) {
                fill(customColourForBoth);
            } else {
                noFill();
            }
        }
        startCol = this.newCol; //2) save new colour
    };

    //for gui purposes
    var guiCreate = new GuiCreate();
    guiCreate.guiSetupWavePattern();
    this.guiToggle = function () {
        guiCreate.guiToggle();
    };
    this.selectVisual = function () {
        guiCreate.selectVisual();
    };
    this.unSelectVisual = function () {
        guiCreate.unSelectVisual();
    };
}
