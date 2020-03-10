let InteractiveHistogram = (p) => {

    let frameRates = [];
    let displayFrameRate;

    // number of bars
    let barCount = 25;

    // is a bar colored?
    let colored = [];

    // has the color of the bars changed?
    let change = [];

    // holds all bars heights (not for generation, 
    // but for detection when clicking)
    let heights = [];

    // arbitrary unitless constant for bar height.
    // Changes with '+' and '-'
    let barHeightScalar = 250;

    let frameRateCallback;
    let barHeightScalarCallback;

    let didSetup = false;

    p.setup = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.createCanvas(w, h);

        p.colorMode(p.HSB, 360, 100, 100);
        p.background('#e6e6fa'); //e6e6fa
        p.frameRate(120);

        didSetup = true;
    };

    p.draw = function () {
        p.checkResize();

        let bgHue = p.mouseX < p.width / 2 ? p.map(p.mouseX, 0, p.width, 0, 360) + 180 : p.map(p.mouseX, 0, p.width, 0, 360) - 180;
        let bgSat = 30 + p.map(p.mouseY, 0, p.height, 0, 70);
        p.background(bgHue, bgSat, 100);
        p.rectMode(p.CORNERS);
        let step = p.width / (barCount);

        for (let i = 0; i < barCount; i++) {

            let x1 = i * step;
            let y1 = p.height;
            let x2 = (i + 1) * step;
            let y2;

            let xBar = (x1 + x2) / 2;
            let dist = p.dist(p.mouseX, p.mouseY, xBar, p.height);
            let temp = (barHeightScalar * 1000 / (dist + 50)) - 150;
            let rectHeight = temp < p.height ? temp : p.height;
            let rectWidth = x2 - x1;
            rectHeight = rectHeight < 3 * (rectWidth / 8) ? 3 * (rectWidth / 8) : rectHeight;
            y2 = p.height - rectHeight;

            heights[i] = rectHeight;
            let hue = p.map(xBar, 0, p.width, 0, 360);
            let sat = p.map(rectHeight, 0, p.height, 30, 100);

            p.fill(hue, sat, 90);
            p.rect(x1, y1, x2, y2);
            if (colored[i]) {
                p.noStroke();
                p.fill(hue, sat, 90);
            } else {
                p.fill(0);
            }

            p.rect(x1 + (rectWidth / 8), y1 - (rectWidth / 8), x2 - (rectWidth / 8), y2 + (rectWidth / 8));
            p.stroke(1);
            p.fill(0, 0, 100);
        }
        // calc framerate
        if (p.frameCount % 10 === 0) {
            frameRates.push(p.frameRate());
            if (frameRates.length > 10) {
                frameRates.shift();
            }
            displayFrameRate = frameRates.reduce((sum, num) => {
                return sum + num;
            }) / frameRates.length;
        }

        if (p.frameCount % 10 === 0) {
            if (typeof frameRateCallback !== "undefined") {
                frameRateCallback(displayFrameRate.toFixed(0));
            }
            if (typeof barHeightScalarCallback !== "undefined") {
                barHeightScalarCallback(barHeightScalar.toFixed(0));
            }
        }

    };

    p.windowResized = function () {
        p.resize();
    };

    p.resize = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.resizeCanvas(w, h);
    };

    p.checkResize = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        if (w !== p.width || h !== p.height) {
            p.resize();
        }
    };

    p.mousePressed = function () {
        let step = p.width / (barCount);

        let rect = p.floor(p.mouseX / step);
        if (rect < 0)
            rect = 0;
        if (rect > barCount - 1)
            rect = (barCount - 1);
        colored[rect] = p.height - p.mouseY < heights[rect] ? !colored[rect] : colored[rect];
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (didSetup) {
            if (typeof newProps.barHeightScalar !== "undefined") {
                barHeightScalar = newProps.barHeightScalar;
                console.log(barHeightScalar)
            }
        }
        if (typeof newProps.onFrameRateChange !== "undefined") {
            frameRateCallback = newProps.onFrameRateChange;
        }
        // if (typeof newProps.onBarHeightScalarChange !== "undefined") {
        //     barHeightScalarCallback = newProps.onBarHeightScalarChange;
        // }
    };

};

export default InteractiveHistogram;

/*

package me.paul.interactivehistogram;

import javafx.scene.paint.Color;
import processing.core.PApplet;

public class InteractiveHistogram extends PApplet {

	public void draw() {

		if (keyPressed && key == '1')
			k -= k / 250;
		if (keyPressed && key == '2')
			k += k / 250;


	}
}

*/