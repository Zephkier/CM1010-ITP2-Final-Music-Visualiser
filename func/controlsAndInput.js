//connected to sketch.js file
function ControlsAndInput() {
    //set y value for menu symbol, playback button symbols, volume gui, timestamp corner, and music titles
    this.textHeight = 55;

    //set constructor variables
    var hotkeysGuide = new HotkeysGuide(),
        menu = new Menu(this.textHeight),
        playbackButton = new PlaybackButton(this.textHeight),
        playbarTimestampAndTitle = new PlaybarTimestampAndTitle();

    this.draw = function () {
        //draw based on respective .js files
        hotkeysGuide.draw();
        menu.drawMenu();
        playbackButton.draw();
        playbarTimestampAndTitle.draw();
        //cursor changes (this is conslidated across other "func" .js files)
        cursor("default");
        if (menu.checkIfCursorWithinMenuSymbol() || playbackButton.withinPlayPause || playbackButton.withinStop || playbarTimestampAndTitle.checkIfCursorWithinPlaybar()) {
            cursor("pointer");
        }
    };

    this.mousePressed = function () {
        //mousePressed based on respective .js files
        menu.toggleMenuViaMouse();
        playbackButton.hitCheck();
        playbarTimestampAndTitle.jumpToHere();
    };

    this.keyPressed = function () {
        //keyPressed based on respective .js files
        //n for next, b for back
        if (keyCode == 78 || keyCode == 66) {
            //n for next
            if (keyCode == 78) {
                //if at the last music track and user presses "next", then go back to first music track
                chosenMusicIndex = (chosenMusicIndex + 1) % musicOptions.length;
            }
            //b for back
            if (keyCode == 66) {
                //if at the first music track and user presses "back", then go back to last music track
                chosenMusicIndex = (chosenMusicIndex - 1 + musicOptions.length) % musicOptions.length;
            }
            //after switching music, stop current music, do "preload" function for new music
            chosenMusic.stop();
            preload();
        }
        //h for hotkeys
        if (keyCode == 72) {
            hotkeysGuide.toggleHotkeysGuide();
        }
        //g for gui
        if (keyCode == 71) {
            vis.selectedVisual.guiToggle();
            var gui;
            gui.close();
        }
        //f for fullscreen
        if (keyCode == 70) {
            goFullscreen = !goFullscreen;
            if (goFullscreen) {
                resizeCanvas(windowWidth, windowHeight);
            } else {
                resizeCanvas(1280, 720);
            }
        }
        //m for menu
        if (keyCode == 77) {
            menu.toggleMenuViaKeyboard();
        }
        //spacebar to play/pause
        if (keyCode == 32) {
            if (chosenMusic.isPlaying()) {
                chosenMusic.pause();
            } else {
                chosenMusic.play();
            }
        }
        //any key
        if (keyCode) {
            playbarTimestampAndTitle.togglePlaybarWorksText();
        }
        //number 1 to 9
        if (keyCode > 48 && keyCode < 58) {
            var visNumber = keyCode - 49;
            vis.selectVisual(vis.visuals[visNumber].name);
        }
    };
}
