//connected to needles.js file
function needleItemsAndEnergyItems(centreX, bottomY, energyName, energyValue) {
    push();
    fill("black");
    noStroke();
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(textSizeDefault);
    translate(centreX, bottomY);
    //energy name
    text(energyName, 0, 0 - needlesVis.dialRadius / 3);
    //energy number
    var energyValueMapped = floor(map(energyValue, 0, 255, 0, 100));
    text(nf(energyValueMapped, 2), 0, 0 - needlesVis.dialRadius / 3 + 30);
    //needle
    var theta = map(energyValue, 0, 255, needlesVis.minAngle + needlesVis.offsetAngle, needlesVis.maxAngle - needlesVis.offsetAngle);
    var x = needlesVis.dialRadius * cos(theta);
    var y = needlesVis.dialRadius * sin(theta);
    stroke("grey");
    line(0, -1, x, y);
    //needle base
    fill("black");
    noStroke();
    arc(0, 0, 30, 30, 180, 360);
    pop();
}
