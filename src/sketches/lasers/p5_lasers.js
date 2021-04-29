const Lasers = (p) => {

    // Required for all sketches
    let updateFrequency = 10;
    let frameRates = [];
    let displayFrameRate = 0;
    let didSetup = false;

    let informationCallback;

    p.setup = () => {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        let c = p.createCanvas(w, h, p.P2D);
        p.disableRightClick(c.canvas);

        p.frameRate(120);
        p.colorMode(p.HSB, 360, 100, 100, 100);

        didSetup = true;
    };

    p.draw = () => {
        p.checkResize();

        // START SKETCH

        p.background(0);

        // END SKETCH

        p.calculateFrameRate();
        p.updateCallbacks();
    };

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

    p.updateCallbacks = () => {
        if (p.frameCount % updateFrequency === 0) {
            // if (typeof variableCallback !== "undefined") {
            //     variableCallback(myVariable);
            // }

            // use with the "information" transmission

            if (typeof informationCallback !== "undefined") {
                informationCallback(new Map([
                    ["framerate", "FPS: " + displayFrameRate.toFixed(0)],
                ]));
            }
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // sketch components
        if (didSetup) {
            // if (typeof newProps.myChangeableParameter !== "undefined") {
            //     if (myChangeableParameter !== newProps.myChangeableParameter) {
            //         myChangeableParameter = newProps.myChangeableParameter;
            //     }
            // }
        }
        // if (typeof newProps.onVariableChange !== "undefined") {
        //     if (typeof variableCallback === "undefined") {
        //         variableCallback = newProps.onVariableChange;
        //     }
        // }

        // if you want to relay text-based information back to the user
        // you can uncomment the following block and utilize the "information" map and callback

        if (typeof newProps.onInformationChange !== "undefined") {
            if (typeof informationCallback === "undefined") {
                informationCallback = newProps.onInformationChange;
            }
        }
    };

};

export default Lasers;