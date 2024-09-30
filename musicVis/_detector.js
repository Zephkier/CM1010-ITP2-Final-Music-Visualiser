/*
ASSISTANCE START:
- inspo from Coursera's ITP2 Week 13, 7.202 and 7.203 videos
- which took inspo from an article @ http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html
*/
function Detector() {
    var sampleBuffer = [];

    //takes in "spectrum" as input, which is an array of 1024 elements (each valued from 0 to 255) of CURRENT audio
    this.detectBeat = function (spectrum) {
        var sum = 0;
        for (var i = 0; i < spectrum.length; i++) {
            sum += spectrum[i] * spectrum[i];
        }
        //if array length reach 60,then detect a beat
        if (sampleBuffer.length == 60) {
            var sampleSum = 0;
            var isBeat = false;
            for (var i = 0; i < sampleBuffer.length; i++) {
                sampleSum += sampleBuffer[i];
            }
            var sampleAverage = sampleSum / sampleBuffer.length;
            //"c" refers to how much, over the sampleAverage, is considered a beat
            var c = calculateConstant(sampleAverage);
            //if sum is greater, then that is a beat
            if (sum > sampleAverage * c) {
                isBeat = true;
            } else {
                isBeat = false;
            }
            sampleBuffer.splice(0, 1);
            sampleBuffer.push(sum);
        } else {
            sampleBuffer.push(sum);
        }
        return isBeat;
    };

    function calculateConstant(sampleAverage) {
        var varianceSum = 0;
        for (var i = 0; i < sampleBuffer.length; i++) {
            varianceSum += sampleBuffer[i] - sampleAverage;
        }
        var variance = varianceSum / sampleBuffer.length;
        var m = -0.15 / (25 - 200);
        var b = 1 + m * 200;
        return m * variance + b;
    }
}
//ASSISTANCE END
