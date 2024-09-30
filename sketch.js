//global variables: in general
var chosenMusic, fft, fftTwo, amp, vis, controlsAndInput, detector, gradientRand;
var goFullscreen = true;

//global variables: for gui purposes
var spectrumVis, wavePatternVis, freqLinesVis, freqBeatsVis;
var volumeControl = 50;

//global variables: to standardise formatting
var translucent;
var textSizeBig = 36,
    textSizeDefault = 24,
    textSizeSmall = 18;

//music options (MP3's only (sorry!) due to "preload" function)
var musicOptions = [
        "stomper_reggae_bit", //format
        "Chill Lofi Hip Hop Beat", //copyright-free music @ https://www.youtube.com/watch?v=hQT6WMJ-Fco&ab_channel=Chill-CopyrightFreeMusic
        "Independence - Punk Rock", //copyright-free music @ https://www.youtube.com/watch?v=WYxu4-CUlxQ&ab_channel=Independence-NoCopyrightRockMusic
        "Joakim Karud - Dreams", //copyright-free music @ https://www.youtube.com/watch?v=WHi_xjTR49g&ab_channel=MusicLibrary-TheSourceforContentCreators
        "Satie - Gymnopedie No. 1", //copyright-free music @ https://www.youtube.com/watch?v=hBEKopMbC-A&ab_channel=CopyrightFreeClassicalMusic
        "The Bomb_2 (MF Doom Type Beat)", //copyright-free music @ https://www.youtube.com/watch?v=FQ112egQUX8&ab_channel=766N
    ],
    chosenMusicIndex = 0;

function preload() {
    chosenMusic = loadSound("music/" + musicOptions[chosenMusicIndex] + ".mp3"); //output should be a directory path to music file ending with ".mp3"
}

function setup() {
    createCanvas(1280, 720);
    resizeCanvas(windowWidth, windowHeight);

    //set defaults
    angleMode(DEGREES);
    translucent = {
        black200: color(0, 200),
        white50: color(255, 50),
        white100: color(255, 100),
        white150: color(255, 150),
    };

    //set constructor variables
    fft = new p5.FFT();
    amp = new p5.Amplitude();
    vis = new Visualisations();
    controlsAndInput = new ControlsAndInput();
    detector = new Detector();

    //for gui purposes
    spectrumVis = new Spectrum();
    wavePatternVis = new WavePattern();
    needlesVis = new Needles();
    freqLinesVis = new FreqLines();
    freqBeatsVis = new FreqBeats();

    //1) add into vis array and 2) for gui purposes
    vis.add(spectrumVis); //    OG improved 1
    vis.add(wavePatternVis); // OG improved 2
    vis.add(needlesVis); //     OG improved 3
    vis.add(freqLinesVis); //   new 4
    vis.add(freqBeatsVis); //   new 5

    //for gui purposes (placed here instead of gui.js file as it needs to be shown all the time)
    var gui = createGui("Volume (double-click me!)");
    var playbackButton = new PlaybackButton();
    gui.setPosition(playbackButton.playbackX + playbackButton.playbackWidth * 4, controlsAndInput.textHeight - 20); //same formula as playbackButton.js' "playbackY" (cannot use that var directly as it must first take in a "yValue" input)
    gui.show(); //upon setup, gui is shown
    sliderRange(0, 100, 1);
    gui.addGlobals("volumeControl");

    //for background below
    gradientRand = random(50);
}

function draw() {
    //background
    var gradientTop = color(gradientRand);
    var gradientBot = color("black");
    for (var i = 0; i < height; i++) {
        var mappedRange = map(i, 0, height, 0, 1);
        var gradientCol = lerpColor(gradientTop, gradientBot, mappedRange);
        stroke(gradientCol);
        line(0, i, width, i);
    }

    //connected to "setup" function above
    chosenMusic.setVolume(volumeControl / 100); //must be in "draw" function so that changes will apply to volume output

    //draw based on visualisations.js and respective vis .js files
    vis.selectedVisual.draw();

    //draw based on controlsAndInput.js file
    controlsAndInput.draw();
}

function mouseClicked() {
    //mouseClicked based on controlsAndInput.js file
    controlsAndInput.mousePressed();
}

function keyPressed() {
    //keyPressed based on controlsAndInput.js file
    controlsAndInput.keyPressed();
}

function windowResized() {
    //mainly for needles.js file
    if (goFullscreen) {
        resizeCanvas(windowWidth, windowHeight);
    }
    if (vis.selectedVisual.hasOwnProperty("onResize")) {
        vis.selectedVisual.onResize();
    }
}

//to standardise formatting
function myStrokeSettings() {
    stroke("black");
    strokeWeight(2);
    strokeJoin(ROUND);
}
