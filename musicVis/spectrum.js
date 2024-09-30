//for gui purposes: global variables, but only specific to this
var rainbowRestartPosition = 70,
    heightAmount = 30,
    zoomInAmount = 1;

//contructor function for this
function Spectrum() {
    this.name = "Spectrum (Improved)";

    this.draw = function () {
        var spectrum = fft.analyze(); //returns an array of 1024 (16 in this case) elements (each valued from 0 to 255) of CURRENT audio
        var specLength = spectrum.length / zoomInAmount;

        colorMode(HSB);
        //1 for bottom half, -1 for top half
        for (var side = -1; side <= 1; side += 2) {
            for (var i = 0; i < specLength; i++) {
                var rainbowRestartsHere = rainbowRestartPosition / 100;
                var colourRange = map(i, 0, specLength * rainbowRestartsHere, 0, 255);
                fill(colourRange, 255, 255);
                stroke(colourRange, 255, 255);
                var rectX = map(i, 0, specLength, 0, width);
                var rectY = height / 2;
                var rectW = width / specLength;
                var rectH = map(spectrum[i], 0, 255, 0.05, height * (heightAmount / 100)) * side;
                rect(rectX, rectY, rectW, rectH);
            }
        }
        colorMode(RGB); //reset to default
    };

    //for gui purposes
    var guiCreate = new GuiCreate();
    guiCreate.guiSetupSpectrum();
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
