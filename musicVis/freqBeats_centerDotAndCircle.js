//connected to freqBeats.js file
function centerDotAndCircle() {
    var centerDotSize = amp.getLevel(); //moves according to amplitude
    //dot
    fill("white");
    noStroke();
    ellipse(width / 2, height / 2, 10 + centerDotSize * 50);
    //circle line
    noFill();
    stroke("white");
    strokeWeight(2);
    ellipse(width / 2, height / 2, 20 + centerDotSize * 200);
}
