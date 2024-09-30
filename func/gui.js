//connected to all vis .js files
function GuiCreate() {
    //setup and create gui
    var gui;
    this.guiSetupSpectrum = function () {
        gui = createGui("Spectrum Settings ------------------- (default: 70, 30, 1)");
        gui.hide(); //upon setup, gui is hidden
        sliderRange(1, 100, 1);
        gui.addGlobals("rainbowRestartPosition", "heightAmount", "zoomInAmount");
    };

    this.guiSetupWavePattern = function () {
        gui = createGui("Wave Pattern Settings -------------- (default: 200, 100, 50)");
        gui.hide(); //upon setup, gui is hidden
        sliderRange(100, 300, 1);
        gui.addGlobals("circleSize");
        sliderRange(50, 200, 1);
        gui.addGlobals("backgroundDotSize");
        sliderRange(1, 100, 1);
        gui.addGlobals("backgroundDotThreshold");
        gui.addGlobals("flashingBackgroundDot", "flashingCircle", "fillCircle", "customColourForBoth");
    };

    this.guiSetupNeedles = function () {
        gui = createGui("No GUI for Needles");
        gui.hide(); //upon setup, gui is hidden
    };

    this.guiSetupFreqLines = function () {
        gui = createGui("Frequency Lines Settings --------- (default: 5, 10, 40)");
        gui.hide(); //upon setup, gui is hidden
        sliderRange(1, 20, 1);
        gui.addGlobals("freqLinesStrokeWeight");
        gui.addGlobals("freqLinesWaveHeight");
        sliderRange(2, 100, 1);
        gui.addGlobals("freqLinesWaveAmount");
    };

    this.guiSetupFreqBeats = function () {
        gui = createGui("Frequency Beats Settings --------- (default: X, 15, 5, 2, 50, 50, 50)");
        gui.hide(); //upon setup, gui is hidden
        gui.addGlobals("enableColours");
        sliderRange(0, 100, 1);
        gui.addGlobals("amountOfCircles", "amountOfSquares");
        sliderRange(1, 10, 1);
        gui.addGlobals("shapeStrokeWeight");
        sliderRange(0, 100, 1);
        gui.addGlobals("trebleThreshold", "midThreshold", "bassThreshold");
    };

    //toggle gui appear or not
    var guiAppear = true;
    this.guiToggle = function () {
        guiAppear = !guiAppear;
        if (guiAppear) {
            gui.show();
        } else {
            gui.hide();
        }
    };

    this.selectVisual = function () {
        if (guiAppear) {
            //upon vis selection, gui is shown
            gui.setPosition(20, height - gui.prototype._panel.clientHeight - 20); //ASSISTANCE START and END: university lecturer taught the usage of "gui.prototype._panel.clientHeight" and other useful p5gui properties
            gui.show();
        } else {
            gui.hide();
        }
    };

    this.unSelectVisual = function () {
        gui.hide();
    };
}
