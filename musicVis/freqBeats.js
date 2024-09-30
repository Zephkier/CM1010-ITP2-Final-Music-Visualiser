//for gui purposes: global variables, but only specific to this
var enableColours = true,
    amountOfCircles = 15, //actual number of shapes appearing is (amountOfCircles - 1), need this to limit array length to prevent lag
    amountOfSquares = 5, //actual number of shapes appearing is (amountOfSquares - 1), need this to limit array length to prevent lag
    shapeStrokeWeight = 2,
    trebleThreshold = 50,
    midThreshold = 50,
    bassThreshold = 50;

//contructor function for this
function FreqBeats() {
    this.name = "Frequency Beats";

    var circles = [];
    var squares = [];
    this.draw = function () {
        //push into array
        var spectrum = fft.analyze(); //returns an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
        var energyNames = ["treble", "mid", "bass"]; //circle = treble and highMid, square = lowMid and bass/beat
        for (var i = 0; i < energyNames.length; i++) {
            var energyLevel = fft.getEnergy(energyNames[i]); //must use ".analyze()" first, then this returns a value from 0 to 255
            //circle = treble, mid, bass
            if (circles.length < amountOfCircles) {
                if (energyNames[i] == "treble" && energyLevel > 255 * (trebleThreshold / 100)) {
                    circles.push(new ShapeConstructor(width * (1 / 4), 0));
                    circles.push(new ShapeConstructor(width * (3 / 4), 0));
                }
                if (energyNames[i] == "mid" && energyLevel > 255 * (midThreshold / 100)) {
                    circles.push(new ShapeConstructor(width * (1 / 10), height / 2));
                    circles.push(new ShapeConstructor(width * (9 / 10), height / 2));
                }
                if (energyNames[i] == "bass" && energyLevel > 255 * (bassThreshold / 100)) {
                    circles.push(new ShapeConstructor(width * (1 / 4), height));
                    circles.push(new ShapeConstructor(width * (3 / 4), height));
                }
            }
            //square = beat
            if (squares.length < amountOfSquares && detector.detectBeat(spectrum)) {
                squares.push(new ShapeConstructor(width / 2, height / 2));
            }
        }
        //manipulate elements in the array
        //circle
        for (var i = circles.length - 1; i >= 0; i--) {
            circles[i].drawCircle();
            circles[i].update();
            if (circles[i].isDead()) {
                circles.splice(i, 1);
            }
        }
        //square
        rectMode(CENTER);
        for (var i = squares.length - 1; i >= 0; i--) {
            squares[i].drawSquare();
            squares[i].update();
            if (squares[i].isDead()) {
                squares.splice(i, 1);
            }
        }
        rectMode(CORNER); //reset to default
        //center dot and circle
        centerDotAndCircle();
    };

    //for gui purposes
    var guiCreate = new GuiCreate();
    guiCreate.guiSetupFreqBeats();
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
