const artgenerator5 = (p) => {

    // Required for all sketches
    let updateFrequency = 3;
    let frameRates = [];
    let displayFrameRate = 0;
    let didSetup = false;

    let informationCallback;

    const ROUNDS_PER_FRAME = 3;

    const BORDER_THICKNESS = 10;

    let BORDER_COLOR;
    let BACKGROUND_COLOR;
    let IMAGE_BACKGROUND_COLOR;

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

    let image;

    let imageWidth = 1920;
    let imageHeight = 1080;

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

        p.frameRate(60);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.imageMode(p.CENTER);
        p.rectMode(p.CORNERS);

        fringePixels = new Map();
        fringeToAdd = new Map();
        visitedPixels = new Map();
        drawPixels = new Map();

        BACKGROUND_COLOR = p.color(0, 0, 80);
        BORDER_COLOR = p.color(0, 0, 0);
        IMAGE_BACKGROUND_COLOR = p.color(0, 0, 100);

        image = p.createImage(imageWidth, imageHeight);
        image.loadPixels();
        p.drawImageBackground();

        // set up arrays
        // fringePixels = [];
        // visitedPixels = [];
        // unvisitedPixels = [];
        // for (let i=0; i<img.width; i++) {
        //     fringePixels[i] = [];
        //     visitedPixels[i] = [];
        //     unvisitedPixels[i] = [];
        // }

        p.background(BACKGROUND_COLOR);

        didSetup = true;
    };

    p.draw = () => {
        p.checkResize();

        // START SKETCH

        for (let i = 0; i < ROUNDS_PER_FRAME; i++) {
            // do a round
            p.updatePixelRound();

            // update chances
            if (isGenerating) {
                p.updateChances();
            }
        }
        p.drawPixels();

        if (visitedPixels.size === image.width * image.height) {
            isGenerating = false;
        }

        p.drawBorder();
        p.drawImage();

        // END SKETCH

        p.calculateFrameRate();
        p.updateCallbacks();
    };

    // helpers

    p.drawImageBackground = () => {
        for (let x=0; x<image.width; x++) {
            for (let y=0; y<image.height; y++) {
                image.set(x, y, IMAGE_BACKGROUND_COLOR);
            }
        }
        image.updatePixels();
    }

    p.drawImage = () => {
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let imageDisplayWidth = p.getImageDisplayWidth();
        let imageDisplayHeight = p.getImageDisplayHeight();

        p.image(image, centerX, centerY, imageDisplayWidth, imageDisplayHeight);
    };

    p.getImageDisplayWidth = () => {
        let scalingFactor = p.getScalingFactor();
        let imageDisplayWidth;
        if (scalingFactor >= 1.0) {
            imageDisplayWidth = image.width;
        } else {
            imageDisplayWidth = image.width * scalingFactor;
        }
        return imageDisplayWidth;
    };

    p.getImageDisplayHeight = () => {
        let scalingFactor = p.getScalingFactor();
        let imageDisplayHeight;
        if (scalingFactor >= 1.0) {
            imageDisplayHeight = image.height;
        } else {
            imageDisplayHeight = image.height * scalingFactor;
        }
        return imageDisplayHeight;
    };

    p.getScalingFactor = () => {
        let scalingFactorX = (p.width - BORDER_THICKNESS * 2) / image.width;
        let scalingFactorY = (p.height - BORDER_THICKNESS * 2) / image.height;

        return p.min(scalingFactorX, scalingFactorY);
    };

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
            if (p.random() < EAST_CHANCE && location[0] !== image.width - 1) {
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
            if (p.random() < SOUTH_CHANCE && location[1] !== image.height - 1) {
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
            image.set(location[0], location[1], color);
        });
        image.updatePixels();

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
            location[0] === image.width - 1 ||
            visitedPixels.has(eastLocationStr) ||
            fringePixels.has(eastLocationStr) ||
            fringeToAdd.has(eastLocationStr);

        let isSouthVisited =
            location[1] === image.height - 1 ||
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

        let locationStr = origin.x + "," + origin.y;
        let colorArr = [hue, saturation, brightness, alpha];

        if (!fringePixels.has(locationStr) &&
            !visitedPixels.has(locationStr) &&
            !fringeToAdd.has(locationStr)) {
            fringePixels.set(locationStr, colorArr);
            drawPixels.set(locationStr, colorArr);
            isGenerating = true;
        }
    };

    p.drawBorder = () => {
        p.fill(BORDER_COLOR);

        let centerX = p.width / 2;
        let centerY = p.height / 2;

        let displayWidth = p.getImageDisplayWidth();
        let displayHeight = p.getImageDisplayHeight();

        let imageNorthWest = p.createVector(centerX - displayWidth / 2, centerY - displayHeight / 2);
        let imageSouthEast = p.createVector(centerX + displayWidth / 2, centerY + displayHeight / 2);

        p.rect(
            imageNorthWest.x - BORDER_THICKNESS,
            imageNorthWest.y - BORDER_THICKNESS,
            imageSouthEast.x + BORDER_THICKNESS,
            imageSouthEast.y + BORDER_THICKNESS);
    }

    p.getLocationOnImage = (vector) => {
        let halfWidth = p.width / 2;
        let halfHeight = p.height / 2;
        vector.sub(halfWidth, halfHeight);

        let displayWidth = p.getImageDisplayWidth();
        let displayHeight = p.getImageDisplayHeight();

        let xLocation = p.map(vector.x, -displayWidth / 2, displayWidth / 2, 0, image.width);
        let yLocation = p.map(vector.y, -displayHeight / 2, displayHeight / 2, 0, image.height);

        return p.createVector(xLocation, yLocation);

    }

    p.shuffleMap = (map) => new Map(p.shuffle(Array.from(map.entries())));

    p.isMouseOverImage = () => {
        let mouseVector = p.createVector(p.mouseX, p.mouseY);
        let imageLocation = p.getLocationOnImage(mouseVector);

        return (
            imageLocation.x >= 0 && 
            imageLocation.x < image.width && 
            imageLocation.y >= 0 && 
            imageLocation.y < image.height);
    }

    // event and input

    p.mousePressed = () => {
        // let xLoc = parseInt(p.mouseX);
        // let yLoc = parseInt(p.mouseY);
        let mouseVector = p.createVector(p.mouseX, p.mouseY);
        let imageLocation = p.getLocationOnImage(mouseVector);

        let xLoc = parseInt(imageLocation.x);
        let yLoc = parseInt(imageLocation.y);
        let locationStr = xLoc + "," + yLoc;
        console.log(locationStr);
        console.log(visitedPixels.get(locationStr));
        console.log(visitedPixels.has(locationStr));
        if (p.isMouseOverCanvas() &&
            p.isMouseOverImage() &&
            p.mouseButton === p.LEFT &&
            !visitedPixels.has(locationStr) &&
            !fringePixels.has(locationStr)) {
            // if (!isOriginSet) {
            let origin = p.createVector(xLoc, yLoc);
            p.setOrigin(origin)
            // }
        }
    };

    p.keyPressed = () => {
        if (p.key === ' ') {
            console.log("saving image...");
            image.save("my-image", "png");
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
                let percentageFilled = ((visitedPixels.size / (image.width * image.height)) * 100);
                informationCallback(new Map([
                    ["instructions", "Press SPACEBAR to save image"],
                    ["separator_1", "---"],
                    ["frame_rate", "FPS: " + displayFrameRate.toFixed(0)],
                    ["image_size", "Image Size: " + image.width + " x " + image.height],
                    ["pixel_count", "Pixels: " + (image.width * image.height)],
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
        if (p.mouseX >= 0 && p.mouseX < p.width &&
            p.mouseY >= 0 && p.mouseY < p.height) {
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

        // visitedPixels.clear();
        // fringePixels.clear();

        // image = p.createImage(imageWidth, imageHeight);
        // image.loadPixels();

        p.background(BACKGROUND_COLOR);

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