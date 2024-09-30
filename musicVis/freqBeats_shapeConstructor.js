/*
ASSISTANCE START:
- inspo from Coursera's ITP2 Week 13, 7.202 and 7.203 videos
- inspo from YouTube video @ https://www.youtube.com/watch?v=GD0aorbX3Wk&ab_channel=tizmm
- inspo from YouTube video's GitHub page @ https://github.com/izm51/visual-coding/tree/master/docs/visualizer1-pastel
*/
function ShapeConstructor(x, y) {
    var x = x,
        y = y,
        opacityLifespan = 255,
        expandingSize = 0,
        spinAngle = random(360),
        randomColor;

    if (enableColours) {
        randomColor = color(random(255), random(255), random(255));
    } else {
        randomColor = color(255);
    }

    this.drawSquare = function () {
        noFill();
        strokeWeight(shapeStrokeWeight);
        stroke(red(randomColor), green(randomColor), blue(randomColor), opacityLifespan);
        push();
        translate(x, y);
        rotate(spinAngle);
        rect(0, 0, expandingSize);
        pop();
    };

    this.drawCircle = function () {
        noFill();
        strokeWeight(shapeStrokeWeight);
        stroke(255, opacityLifespan);
        ellipse(x, y, expandingSize);
    };

    this.update = function () {
        opacityLifespan -= 4;
        expandingSize += 8;
    };

    this.isDead = function () {
        if (opacityLifespan <= 0) {
            return true;
        }
    };
}
//ASSISTANCE END
