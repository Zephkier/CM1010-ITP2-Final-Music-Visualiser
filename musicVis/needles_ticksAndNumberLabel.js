//connected to needles.js file
function ticksAndNumberLabel(centreX, bottomY) {
    var nextTickAngle = needlesVis.minAngle + needlesVis.offsetAngle;
    push();
    fill("black");
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(textSizeDefault);
    translate(centreX, bottomY);
    //main ticks, sub-ticks, and its number label
    for (var i = 0; i < 11; i++) {
        //setup number label
        var textX = (needlesVis.dialRadius - 45) * cos(nextTickAngle);
        var textY = (needlesVis.dialRadius - 45) * sin(nextTickAngle);
        fill("black");
        noStroke();
        //draw every even number only
        if (i % 2 == 0) {
            text(i * 10, textX, textY);
        }
        //setup main ticks
        var x = needlesVis.dialRadius * cos(nextTickAngle);
        var x1 = (needlesVis.dialRadius - 20) * cos(nextTickAngle);
        var y = needlesVis.dialRadius * sin(nextTickAngle);
        var y1 = (needlesVis.dialRadius - 20) * sin(nextTickAngle);
        stroke("black");
        //draw main ticks
        line(x, y, x1, y1);
        var tickSplit = 16; //magic hard value to make main ticks (0 to 10) symmetrical
        nextTickAngle += tickSplit;
        //setup sub-ticks
        var subTickSplit = 5;
        var nextSubTickAngle = nextTickAngle - tickSplit;
        //do not draw sub-ticks when tick number 10 is being drawn
        if (i != 10) {
            for (var j = 0; j < subTickSplit; j++) {
                var subX = needlesVis.dialRadius * cos(nextSubTickAngle);
                var subX1 = (needlesVis.dialRadius - 10) * cos(nextSubTickAngle);
                var subY = needlesVis.dialRadius * sin(nextSubTickAngle);
                var subY1 = (needlesVis.dialRadius - 10) * sin(nextSubTickAngle);
                if (j == 0) {
                    //every sub-tick that goes over main tick is black
                    stroke("black");
                } else {
                    //every other sub-tick is grey
                    stroke("grey");
                }
                //draw sub-ticks
                line(subX, subY, subX1, subY1);
                nextSubTickAngle += tickSplit / subTickSplit;
            }
        }
    }
    pop();
}
