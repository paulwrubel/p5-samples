const artgenerator5 = (p) => {

    // Required for all sketches
    let updateFrequency = 3;
    let frameRates = [];
    let displayFrameRate = 0;
    let didSetup = false;

    let informationCallback;

    const ROUNDS_PER_FRAME = 3;

    let NORTH_CHANCE = 0.25;
    let EAST_CHANCE = 0.75;
    let SOUTH_CHANCE = 0.25;
    let WEST_CHANCE = 0.75;

    let CHANCE_DELTA = 0.0025;

    let NORTH_CHANCE_DELTA = CHANCE_DELTA;
    let EAST_CHANCE_DELTA = CHANCE_DELTA;
    let SOUTH_CHANCE_DELTA = CHANCE_DELTA;
    let WEST_CHANCE_DELTA = CHANCE_DELTA;

    let VARIANCE = 5;

    let NORTH_VARIANCE = [VARIANCE, 0, 0, 0];
    let EAST_VARIANCE = [VARIANCE, 0, 0, 0];
    let SOUTH_VARIANCE = [VARIANCE, 0, 0, 0];
    let WEST_VARIANCE = [VARIANCE, 0, 0, 0];

    let hueRange = [0, 360];
    let saturationRange = [90, 100];
    let brightnessRange = [80, 100];

    let img;

    let getWidth = () => img.width;
    let getHeight = () => img.height;

    let isGenerating = false;

    let fringePixels;
    let fringeToAdd;
    let visitedPixels;
    let drawPixels;

    p.setup = () => {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        let c = p.createCanvas(w, h, p.P2D);
        p.disableRightClick(c.canvas);

        let imageWidth = w;
        let imageHeight = h;
        img = p.createImage(imageWidth, imageHeight);

        p.frameRate(60);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.imageMode(p.CENTER);

        // set up arrays
        // fringePixels = [];
        // visitedPixels = [];
        // unvisitedPixels = [];
        // for (let i=0; i<getWidth(); i++) {
        //     fringePixels[i] = [];
        //     visitedPixels[i] = [];
        //     unvisitedPixels[i] = [];
        // }
        fringePixels = new Map();
        fringeToAdd = new Map();
        visitedPixels = new Map();
        drawPixels = new Map();

        p.background(0);

        img.loadPixels();

        didSetup = true;
    };

    p.draw = () => {
        p.checkResize();

        // START SKETCH

        for (let i=0; i<ROUNDS_PER_FRAME; i++) {
            // do a round
            p.updatePixelRound();

            // update chances
            if (isGenerating) {
                p.updateChances();
            }
        }
        p.drawPixels();

        if (visitedPixels.size === getWidth() * getHeight()) {
            isGenerating = false;
        }

        p.image(img, p.width / 2, p.height / 2, getWidth(), getHeight());

        // END SKETCH

        p.calculateFrameRate();
        p.updateCallbacks();
    };

    // helpers

    p.updatePixelRound = () => {
        // establish delta arrays
        let fringeToRemove = [];
        fringeToAdd.clear();

        // shuffle pixel locations to process
        fringePixels = p.shuffleMap(fringePixels);

        // loop over fringe pixels
        fringePixels.forEach((colorArr, locationStr) => {
            // format location as key
            let location = locationStr.split(',');
            location[0] = parseInt(location[0]);
            location[1] = parseInt(location[1]);

            // check neighbors
            // north
            if (p.random() < NORTH_CHANCE && location[1] !== 0) {
                let northLocationStr = (location[0]) + "," + (location[1] - 1);
                // if we haven't seen this location before...
                if (!fringePixels.has(northLocationStr) &&
                    !visitedPixels.has(northLocationStr) &&
                    !fringeToAdd.has(northLocationStr)) {
                    // ...generate a new color and mark it
                    let northColor = p.generateColor(colorArr, NORTH_VARIANCE);
                    fringeToAdd.set(northLocationStr, northColor);
                }
            }
            // east
            if (p.random() < EAST_CHANCE && location[0] !== getWidth() - 1) {
                let eastLocationStr = (location[0] + 1) + "," + (location[1]);
                // if we haven't seen this location before...
                if (!fringePixels.has(eastLocationStr) &&
                    !visitedPixels.has(eastLocationStr) &&
                    !fringeToAdd.has(eastLocationStr)) {
                    // ...generate a new color and mark it
                    let eastColor = p.generateColor(colorArr, EAST_VARIANCE);
                    fringeToAdd.set(eastLocationStr, eastColor);
                }
            }
            // south
            if (p.random() < SOUTH_CHANCE && location[1] !== getHeight() - 1) {
                let southLocationStr = (location[0]) + "," + (location[1] + 1);
                // if we haven't seen this location before...
                if (!fringePixels.has(southLocationStr) &&
                    !visitedPixels.has(southLocationStr) &&
                    !fringeToAdd.has(southLocationStr)) {
                    // ...generate a new color and mark it
                    let southColor = p.generateColor(colorArr, SOUTH_VARIANCE);
                    fringeToAdd.set(southLocationStr, southColor);
                }
            }
            // west
            if (p.random() < WEST_CHANCE && location[0] !== 0) {
                let westLocationStr = (location[0] - 1) + "," + (location[1]);
                // if we haven't seen this location before...
                if (!fringePixels.has(westLocationStr) &&
                    !visitedPixels.has(westLocationStr) &&
                    !fringeToAdd.has(westLocationStr)) {
                    // ...generate a new color and mark it
                    let westColor = p.generateColor(colorArr, WEST_VARIANCE);
                    fringeToAdd.set(westLocationStr, westColor);
                }
            }

            // if we covered all neighbors either here or in the past...
            if (p.areAllNeighborsVisited(locationStr)) {
                // we're no longer a "fringe" pixel
                fringeToRemove.push(locationStr);
                // and can be added to the finalized list
                visitedPixels.set(locationStr, colorArr);
            }

        });

        // add new pixels and their colors to the fringe
        fringeToAdd.forEach((value, key) => {
            fringePixels.set(key, value);
            // additionally, write them to the image, 
            // as their color won't change now
            drawPixels.set(key, value);
        });

        // remove fringe pixels
        fringeToRemove.forEach(key => {
            fringePixels.delete(key);
        });

    };

    p.updateChances = () => {
        // update north chance
        NORTH_CHANCE += NORTH_CHANCE_DELTA;
        if (NORTH_CHANCE > 1.0) {
            NORTH_CHANCE = 1.0;
            NORTH_CHANCE_DELTA *= -1;
        } else if (NORTH_CHANCE < 0.0) {
            NORTH_CHANCE = 0.0;
            NORTH_CHANCE_DELTA *= -1;
        }

        // update east chance
        EAST_CHANCE += EAST_CHANCE_DELTA;
        if (EAST_CHANCE > 1.0) {
            EAST_CHANCE = 1.0;
            EAST_CHANCE_DELTA *= -1;
        } else if (EAST_CHANCE < 0.0) {
            EAST_CHANCE = 0.0;
            EAST_CHANCE_DELTA *= -1;
        }

        // update north chance
        SOUTH_CHANCE += SOUTH_CHANCE_DELTA;
        if (SOUTH_CHANCE > 1.0) {
            SOUTH_CHANCE = 1.0;
            SOUTH_CHANCE_DELTA *= -1;
        } else if (SOUTH_CHANCE < 0.0) {
            SOUTH_CHANCE = 0.0;
            SOUTH_CHANCE_DELTA *= -1;
        }

        // update north chance
        WEST_CHANCE += WEST_CHANCE_DELTA;
        if (WEST_CHANCE > 1.0) {
            WEST_CHANCE = 1.0;
            WEST_CHANCE_DELTA *= -1;
        } else if (WEST_CHANCE < 0.0) {
            WEST_CHANCE = 0.0;
            WEST_CHANCE_DELTA *= -1;
        }
    };


    p.drawPixels = () => {
        drawPixels.forEach((colorArr, locationStr) => {
            let location = locationStr.split(',');
            let color = p.color(colorArr[0], colorArr[1], colorArr[2], colorArr[3]);
            img.set(location[0], location[1], color);
        });
        img.updatePixels();

        drawPixels.clear();
    };

    p.generateColor = (inputColor, variance) => {
        let color;
        do {
            color = [
                inputColor[0] + p.random(-variance[0], variance[0]), 
                inputColor[1] + p.random(-variance[1], variance[1]),
                inputColor[2] + p.random(-variance[2], variance[2]),
                inputColor[3] + p.random(-variance[3], variance[3]),
            ];
        } while (!p.isValidColor(color));
        return color;
    }

    p.areAllNeighborsVisited = (locationStr) => {
        let location = locationStr.split(',');
        location[0] = parseInt(location[0]);
        location[1] = parseInt(location[1]);

        let northLocationStr = (location[0]) + "," + (location[1] - 1);
        let eastLocationStr = (location[0] + 1) + "," + (location[1]);
        let southLocationStr = (location[0]) + "," + (location[1] + 1);
        let westLocationStr = (location[0] - 1) + "," + (location[1]);

        let isNorthVisited =
            location[1] === 0 ||
            visitedPixels.has(northLocationStr) ||
            fringePixels.has(northLocationStr) ||
            fringeToAdd.has(northLocationStr);

        let isEastVisited =
            location[0] === getWidth() - 1 ||
            visitedPixels.has(eastLocationStr) ||
            fringePixels.has(eastLocationStr) ||
            fringeToAdd.has(eastLocationStr);

        let isSouthVisited =
            location[1] === getHeight() - 1 ||
            visitedPixels.has(southLocationStr) ||
            fringePixels.has(southLocationStr) ||
            fringeToAdd.has(southLocationStr);

        let isWestVisited =
            location[0] === 0 ||
            visitedPixels.has(westLocationStr) ||
            fringePixels.has(westLocationStr) ||
            fringeToAdd.has(westLocationStr);

        return isNorthVisited && isEastVisited && isSouthVisited && isWestVisited;
    };

    p.isValidColor = (colorArr) => {
        return p.isBetween(colorArr[0], hueRange) &&
            p.isBetween(colorArr[1], saturationRange) &&
            p.isBetween(colorArr[2], brightnessRange);
    }

    p.isBetween = (v, arr) => {
        return arr[0] < v && v < arr[1];
    }
    
    p.setOrigin = (origin) => {
        let hue = p.map(p.random(), 0, 1, hueRange[0], hueRange[1]);
        let saturation = p.map(p.random(), 0, 1, saturationRange[0], saturationRange[1]);
        let brightness = p.map(p.random(), 0, 1, brightnessRange[0], brightnessRange[1]);
        let alpha = 100;
        fringePixels.set(origin.x + "," + origin.y, [hue, saturation, brightness, alpha]);
        drawPixels.set(origin.x + "," + origin.y, [hue, saturation, brightness, alpha]);
        isGenerating = true;
    };

    p.shuffleMap = (map) => new Map(p.shuffle(Array.from(map.entries())));

    // event and input

    p.mousePressed = () => {
        let locationStr = p.mouseX + "," + p.mouseY;
        if (p.isMouseOverCanvas() && 
        p.mouseButton === p.LEFT && 
        !visitedPixels.has(locationStr) && 
        !fringePixels.has(locationStr)) {
            // if (!isOriginSet) {
            let origin = p.createVector(p.mouseX, p.mouseY);
            p.setOrigin(origin)
            // }
        }
    };

    p.keyPressed = () => {
        if (p.key === ' ') {
            console.log("saving image...");
            img.save("my-image", "png");
        }
    }

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
                let percentageFilled = ((visitedPixels.size / (getWidth() * getHeight())) * 100);
                informationCallback(new Map([
                    ["instructions", "Press SPACEBAR to save image"],
                    ["separator_1", "---"],
                    ["frame_rate", "FPS: " + displayFrameRate.toFixed(0)],
                    ["fringe_count", "Fringe: " + fringePixels.size],
                    ["visited_count", "Visited: " + visitedPixels.size],
                    ["north_chance", "North Chance: " + (NORTH_CHANCE * 100).toFixed(2) + "%"],
                    ["percentage_filled", "Filled: " + percentageFilled.toFixed(2) + "%"],
                    ["is_generating", "Generating: " + isGenerating],
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

        visitedPixels.clear();
        fringePixels.clear();

        let imageWidth = w;
        let imageHeight = h;
        img = p.createImage(imageWidth, imageHeight);
        img.loadPixels();

        p.background(0);

        isGenerating = false;
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