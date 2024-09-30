/*
ASSISTANCE START:
- inspo from Coursera's ITP1 Week 19, 10.202 video about creating particles and that it is also our first introduction to any particle system
- inspo from particle system demo on p5js' website @ https://p5js.org/examples/simulate-particle-system.html
- inspo from YouTube video @ https://www.youtube.com/watch?v=uk96O7N1Yo0&ab_channel=ColorfulCoding
*/
//connected to wavePattern.js file (note that (0, 0) is still the center)
function DotConstructor() {
    var pos = p5.Vector.random2D().mult(circleSize),
        velo = createVector(0, 0),
        accel = pos.copy().mult(random(0.00025, 0.000025)),
        startSize = 5,
        endSize = backgroundDotSize,
        customSize = startSize;

    this.drawDot = function () {
        wavePatternVis.colourFlashEffect();
        if (flashingBackgroundDot) {
            fill(wavePatternVis.newCol);
        } else {
            fill(customColourForBoth);
        }
        noStroke();
        ellipse(pos.x, pos.y, customSize);
    };

    this.updateDot = function (condition) {
        //movement
        velo.add(accel);
        pos.add(velo);
        if (condition) {
            pos.add(velo);
            pos.add(velo);
            pos.add(velo);
        }
        //size
        /*
        1. start with customSize = startSize of 5
        2. when music plays, slowly increase customSize to mappedSize
        3. when music stops, slowly decrease customSize to startSize of 5
        */
        var distFromCenter = dist(0, 0, pos.x, pos.y),
            startDist = circleSize,
            endDist = sqrt(width * width + height * height) / 2,
            mappedSize = map(distFromCenter, startDist, endDist, startSize, endSize);
        if (chosenMusic.isPlaying()) {
            customSize = lerp(customSize, mappedSize, 0.1);
        } else {
            customSize = lerp(customSize, startSize, 0.1);
        }
    };

    this.reachEdge = function () {
        if (pos.x < (-width - 200) / 2 || pos.x > (width + 200) / 2 || pos.y < (-height - 200) / 2 || pos.y > (height + 200) / 2) {
            return true;
        } else {
            return false;
        }
    };
}
//ASSISTANCE END
