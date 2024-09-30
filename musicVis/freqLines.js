//for gui purposes: global variables, but only specific to this
var freqLinesStrokeWeight = 5,
    freqLinesWaveHeight = 10,
    freqLinesWaveAmount = 40;

//contructor function for this
function FreqLines() {
    this.name = "Frequency Lines";

    this.draw = function () {
        var spectrum = fft.analyze(); //returns an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
        var energyLevels = ["treble", "highMid", "lowMid", "bass"];
        var colourTypes = ["white", "red", "blue", "yellow"];
        noFill();
        strokeWeight(freqLinesStrokeWeight);
        for (var i = 0; i < energyLevels.length; i++) {
            var energyIndividualMapped = map(fft.getEnergy(energyLevels[i]), 0, 255, 0, height * (freqLinesWaveHeight / 100)); //must use ".analyze()" first, then this returns a value from 0 to 255, so map it to a range
            var peaksAndValleysAmount = freqLinesWaveAmount; //actual peaks and valleys amount = (x - 1)
            stroke(colourTypes[i]);
            beginShape();
            curveVertex(0, height * ((i + 1) / 5));
            for (var j = 0; j <= peaksAndValleysAmount; j++) {
                if (j % 2 == 0) {
                    curveVertex(j * (width / peaksAndValleysAmount), height * ((i + 1) / 5) + energyIndividualMapped * (1 - abs(peaksAndValleysAmount / 2 - j) / (peaksAndValleysAmount / 2)));
                } else {
                    curveVertex(j * (width / peaksAndValleysAmount), height * ((i + 1) / 5) - energyIndividualMapped * (1 - abs(peaksAndValleysAmount / 2 - j) / (peaksAndValleysAmount / 2)));
                }
            }
            curveVertex(width, height * ((i + 1) / 5));
            endShape();
        }
    };

    //for gui purposes
    var guiCreate = new GuiCreate();
    guiCreate.guiSetupFreqLines();
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
