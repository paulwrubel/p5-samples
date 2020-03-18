const TEMPLATE = (p) => {

    // Required for all sketches
    let updateFrequency = 10;
    let frameRates = [];
    let displayFrameRate = 0;
    let didSetup = false;

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

    p.updateCallbacks = () => {
        if (p.frameCount % updateFrequency === 0) {
            // if (typeof frameRateCallback !== "undefined") {
            //     frameRateCallback(displayFrameRate.toFixed(0));
            // }

            // if (typeof informationCallback !== "undefined") {
            //     informationCallback(new Map([
            //         ["frame_rate", "FPS: " + displayFrameRate.toFixed(0)],
            //         ["triangle_count", "Triangles: " + triangles.length],
            //         ["bullet_count", "Bullets: " + bulletCount],
            //         ["triangle_update_time", "Triangle Update Time: " + triangleUpdateTime.toFixed(2) + "ms"],
            //         ["bullet_update_time", "Bullet Update Time: " + bulletUpdateTime.toFixed(2) + "ms"],
            //         ["triangle_draw_time", "Triangle Draw Time: " + triangleDrawTime.toFixed(2) + "ms"],
            //         ["bullet_draw_time", "Bullet Draw Time: " + bulletDrawTime.toFixed(2) + "ms"],
            //     ]));
            // }
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
        // if (typeof newProps.onInformationChange !== "undefined") {
        //     if (typeof informationCallback === "undefined") {
        //         informationCallback = newProps.onInformationChange;
        //     }
        // }
    };

};

export default TEMPLATE;