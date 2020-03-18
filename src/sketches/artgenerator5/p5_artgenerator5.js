const artgenerator5 = (p) => {

    // Required for all sketches
    let updateFrequency = 3;
    let frameRates = [];
    let displayFrameRate = 0;
    let didSetup = false;

    let informationCallback;

    let isOriginSet = false;

    let fringePixels;
    let visitedPixels;
    let unvisitedPixels;
    let drawPixels;

    p.setup = () => {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        let c = p.createCanvas(w, h, p.P2D);
        p.disableRightClick(c.canvas);

        p.frameRate(60);
        p.colorMode(p.HSB, 360, 100, 100, 100);

        // set up arrays
        // fringePixels = [];
        // visitedPixels = [];
        // unvisitedPixels = [];
        // for (let i=0; i<p.width; i++) {
        //     fringePixels[i] = [];
        //     visitedPixels[i] = [];
        //     unvisitedPixels[i] = [];
        // }
        fringePixels = new Map();
        visitedPixels = new Map();
        unvisitedPixels = new Map();
        drawPixels = new Map();

        didSetup = true;
    };

    p.draw = () => {
        p.checkResize();

        // START SKETCH
        if (isOriginSet) {
            // p.background(0);
            p.updatePixelRound();
            p.drawPixels();
        } else {
            p.background(0);
        }

        p.fill(0, 0, 100);
        p.text("FPS: " + displayFrameRate.toFixed(2), 20, 20);
        p.text("fringe: " + fringePixels.size, 20, 40);
        p.text("visited: " + visitedPixels.size, 20, 60);
        p.text("drawing: " + drawPixels.size, 20, 80);

        // END SKETCH

        p.calculateFrameRate();
        p.updateCallbacks();
    };

    // helpers

    p.updatePixelRound = () => {
        let fringeToRemove = [];
        let fringeToAdd = []
        fringePixels = new Map(p.shuffle(Array.from(fringePixels.entries())));
        fringePixels.forEach((colorArr, locationStr) => {
            let location = locationStr.split(',');
            location[0] = parseInt(location[0]);
            location[1] = parseInt(location[1]);
            // north
            if (location[1] !== 0) {
                let northLocationStr = (location[0]) + "," + (location[1] - 1);
                // if we haven't seen this location before...
                if (!fringePixels.has(northLocationStr) && !visitedPixels.has(northLocationStr)) {
                    // ...generate a new color and mark it
                    let northColor = [colorArr[0] + p.random(-5, 5), colorArr[1], colorArr[2], colorArr[3]];
                    fringeToAdd.push([northLocationStr, northColor]);
                }
            }
            // east
            if (location[0] !== p.width-1) {
                let eastLocationStr = (location[0] + 1) + "," + (location[1]);
                // if we haven't seen this location before...
                if (!fringePixels.has(eastLocationStr) && !visitedPixels.has(eastLocationStr)) {
                    // ...generate a new color and mark it
                    let eastColor = [colorArr[0] + p.random(-5, 5), colorArr[1], colorArr[2], colorArr[3]];
                    fringeToAdd.push([eastLocationStr, eastColor]);
                }
            }
            // south
            if (location[1] !== p.height-1) {
                let southLocationStr = (location[0]) + "," + (location[1] + 1);
                // if we haven't seen this location before...
                if (!fringePixels.has(southLocationStr) && !visitedPixels.has(southLocationStr)) {
                    // ...generate a new color and mark it
                    let southColor = [colorArr[0] + p.random(-5, 5), colorArr[1], colorArr[2], colorArr[3]];
                    fringeToAdd.push([southLocationStr, southColor]);
                }
            }
            // west
            fringeToRemove.push(locationStr);
            visitedPixels.set(locationStr, colorArr);
        });
        fringeToRemove.forEach(key => {
            fringePixels.delete(key);
        });
        fringeToAdd.forEach(keyvalue => {
            fringePixels.set(keyvalue[0], keyvalue[1]);
            drawPixels.set(keyvalue[0], keyvalue[1]);
        })
    }

    p.drawPixels = () => {
        p.loadPixels();
        drawPixels.forEach((colorArr, locationStr) => {
            let location = locationStr.split(',');
            let color = p.color(colorArr[0], colorArr[1], colorArr[2], colorArr[3]);
            p.set(location[0], location[1], color);
        });
        p.updatePixels();

        drawPixels.clear();
    }

    p.setOrigin = (origin) => {
        let hue = p.map(p.random(), 0, 1, 0, 360);
        let saturation = p.map(p.random(), 0, 1, 80, 100);
        let brightness = p.map(p.random(), 0, 1, 80, 100);
        let alpha = 100;
        fringePixels.set(origin.x + "," + origin.y, [hue, saturation, brightness, alpha]);
        isOriginSet = true;
    };

    // event and input

    p.mousePressed = () => {
        console.log(p.mouseX + ", " + p.mouseY);
        if (p.isMouseOverCanvas() && p.mouseButton === p.LEFT) {
            // if (!isOriginSet) {
                let origin = p.createVector(p.mouseX,  p.mouseY);
                p.setOrigin(origin)
            // }
        }
    };

    // boilerplate

    p.calculateFrameRate = () => {
        if (p.frameCount % updateFrequency === 0) {
            frameRates.push(p.frameRate());
            if (frameRates.length > 10) {
                frameRates.shift();
            }
            displayFrameRate = frameRates.reduce((sum, num) => {
                return sum + num;
            }) / frameRates.length;
        }
    };

    p.updateCallbacks = () => {
        if (p.frameCount % updateFrequency === 0) {
            // if (typeof frameRateCallback !== "undefined") {
            //     frameRateCallback(displayFrameRate.toFixed(0));
            // }

            if (typeof informationCallback !== "undefined") {
                informationCallback(new Map([
                    ["frame_rate", "FPS: " + displayFrameRate.toFixed(0)],
                    ["fringe_count", "Fringe: " + fringePixels.size],
                    ["visited_count", "Visited: " + visitedPixels.size],
                ]));
            }
        }
    };

    p.isMouseOverCanvas = function () {
        if (p.mouseX > 0 && p.mouseX < p.width &&
            p.mouseY > 0 && p.mouseY < p.height) {
            return true;
        }
        return false;
    };

    p.disableRightClick = (canvas) => {
        canvas.oncontextmenu = (event) => {
            event.preventDefault();
            return false;
        }
    };

    p.windowResized = () => {
        p.resize();
    };

    p.resize = () => {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        p.resizeCanvas(w, h);
    };

    p.checkResize = () => {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        if (w !== p.width || h !== p.height) {
            p.resize();
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // sketch components
        if (didSetup) {
            // if (typeof newProps.generationMode !== "undefined") {
            //     if (generationMode !== newProps.generationMode) {
            //         generationMode = newProps.generationMode;
            //     }
            // }
        }
        if (typeof newProps.onInformationChange !== "undefined") {
            if (typeof informationCallback === "undefined") {
                informationCallback = newProps.onInformationChange;
            }
        }
    };

};

export default artgenerator5;