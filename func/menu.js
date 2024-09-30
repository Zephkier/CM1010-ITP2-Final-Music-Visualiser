//connected to controlsAndInput.js file
function Menu(yValue) {
    var menuX = 15,
        menuY = yValue + 2.5,
        drawMenuList = false;

    this.toggleMenuViaMouse = function () {
        if (this.checkIfCursorWithinMenuSymbol()) {
            drawMenuList = !drawMenuList;
        }
    };

    //must be separated from "this.toggleMenuViaMouse" to prevent bug where menu opens when clicking anywhere
    this.toggleMenuViaKeyboard = function () {
        drawMenuList = !drawMenuList;
    };

    this.drawMenu = function () {
        //hover effect
        if (this.checkIfCursorWithinMenuSymbol()) {
            fill("white");
        } else {
            fill(translucent.white100);
        }
        myStrokeSettings();
        textSize(textSizeBig);
        textStyle(BOLD);
        //text
        if (!drawMenuList) {
            text("≡", menuX, menuY);
        } else {
            text("×", menuX, menuY);
            textSize(textSizeDefault);
            drawMenuListItself();
        }
    };

    function drawMenuListItself() {
        //background
        fill(translucent.black200);
        noStroke();
        var menuListBgY = menuY + 20;
        rect(menuX, menuListBgY, 370, 45 * (vis.visuals.length + 1));
        //"use keyboard to select" text
        fill("pink");
        myStrokeSettings();
        var menuListTextX = menuX + 30;
        var menuListTextY = menuListBgY + 50;
        text("*use keyboard to select*", menuListTextX, menuListTextY);
        //"number: vis name" text
        for (var i = 0; i < vis.visuals.length; i++) {
            //if current vis is showing on screen, then make that text green and bold
            if (vis.selectedVisual == vis.visuals[i]) {
                fill("lightgreen");
                textStyle(BOLD);
            } else {
                fill("white");
                textStyle(NORMAL);
            }
            //vis name
            text(
                i + 1 + ": " + vis.visuals[i].name, //format
                menuListTextX,
                menuListTextY + (i + 2) * 30
            );
        }
    }

    this.checkIfCursorWithinMenuSymbol = function () {
        if (mouseX >= menuX && mouseX <= menuX + 20 && mouseY >= menuY - 25 && mouseY <= menuY - 2) {
            return true;
        } else {
            return false;
        }
    };
}
