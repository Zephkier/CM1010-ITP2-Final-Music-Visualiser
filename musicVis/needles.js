//contructor function for this
function Needles() {
    var plotsAcross = 2,
        plotsDown = 2,
        frequencyBins = ["treble", "highMid", "lowMid", "bass"],
        frequencyBinsName = ["Treble", "High Mids", "Low Mids", "Bass"];

    this.name = "Needles (Improved)";
    this.minAngle = 180;
    this.maxAngle = 360;
    this.offsetAngle = 10;

    this.onResize = function () {
        this.padding = width / 12 + height / 12;
        this.plotWidth = min((width - this.padding) / plotsAcross, 800); //prevent plot from becoming oversized
        this.plotHeight = (height - this.padding) / plotsDown + 30;
        this.dialRadius = this.plotWidth / 2 - 10;
    };
    this.onResize();

    this.draw = function () {
        var spectrum = fft.analyze(); //returns an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
        var currentBin = 0; //to iterate frequency bin
        //draw plot (semi-circle) and everything inside it
        fill("beige");
        myStrokeSettings();
        for (var i = 0; i < plotsDown; i++) {
            for (var j = 0; j < plotsAcross; j++) {
                //spacing to centralise plots
                var widthSpacing = (width - this.plotWidth * plotsAcross) / 3;
                var heightSpacing = (height - this.plotHeight * plotsDown) / 3;
                //coords for each plot
                var w = this.plotWidth;
                var h = this.plotHeight;
                var x = (j + 1) * widthSpacing + j * w + w / 2;
                var y = (i + 1) * heightSpacing + i * h + h;
                //draw plot
                arc(x, y, w, w, 180, 360, CHORD);
                //draw main ticks, sub-ticks, and its number label
                ticksAndNumberLabel(x, y);
                //draw needle, needle base, energy name, and energy value
                needleItemsAndEnergyItems(x, y, frequencyBinsName[currentBin], fft.getEnergy(frequencyBins[currentBin]));
                //iterate through energy levels
                currentBin++;
            }
        }
    };

    //for gui purposes
    var guiCreate = new GuiCreate();
    guiCreate.guiSetupNeedles();
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
