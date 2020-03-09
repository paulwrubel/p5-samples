let orbiter = (p) => {

    let frameRates = [];
    let displayFrameRate = 0;

    let planetAngle = 0.0;
    let moonAngle = 0.0;

    let planetOrbitRadius = 100.0;
    let moonOrbitRadius = 15.0;

    let planetOrbitSpeed = 0.4
    let moonOrbitSpeed = 4.5

    let sunRadius = 25.0;
    let planetRadius = 5.0;
    let moonRadius = 2.5;

    let sunLocation = p.createVector(0, 0);

    let planetOrbitSpeedMod = 1.0;
    let moonOrbitSpeedMod = 1.0;

    let deltaTimeOffset = 0.05;

    let isSunBeingDragged = false;
    let sunLocationOffset = p.createVector(0, 0);

    let frameRateCallback;
    let planetSpeedCallback;
    let moonSpeedCallback;

    // let didSetup = false;

    p.setup = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.createCanvas(w, h);

        sunLocation = p.createVector(p.width / 2, p.height / 2);

        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
        // noCursor();

        p.background(0);
        p.fill(0);

        // didSetup = true;
    };

    p.draw = function () {
        p.checkResize();

        if (isSunBeingDragged) {
            sunLocation.x = p.mouseX + sunLocationOffset.x;
            sunLocation.y = p.mouseY + sunLocationOffset.y;
        }

        p.rebound(sunLocation, sunRadius);

        p.background(0);

        planetOrbitSpeedMod = p.sq((sunLocation.x / p.width) * 6.0);
        moonOrbitSpeedMod = p.sq((sunLocation.y / p.height) * 3.0);

        // get some positions
        let planetX = sunLocation.x + planetOrbitRadius * p.cos(planetAngle)
        let planetY = sunLocation.y + planetOrbitRadius * p.sin(planetAngle)
        let moonX = planetX + moonOrbitRadius * p.cos(moonAngle)
        let moonY = planetY + moonOrbitRadius * p.sin(moonAngle)

        // sun
        p.fill(0, 0, 100)
        p.circle(sunLocation.x, sunLocation.y, sunRadius * 2);
        // planet
        p.fill(0, 0, 100)
        p.circle(planetX, planetY, planetRadius * 2);
        // moon
        p.fill(0, 0, 100)
        p.circle(moonX, moonY, moonRadius * 2);
        planetAngle += deltaTimeOffset * p.deltaTime * planetOrbitSpeedMod * planetOrbitSpeed;
        moonAngle += deltaTimeOffset * p.deltaTime * moonOrbitSpeedMod * moonOrbitSpeed;
        planetAngle = planetAngle % 360;
        moonAngle = moonAngle % 360;

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
            if (typeof planetSpeedCallback !== "undefined") {
                planetSpeedCallback((planetOrbitSpeedMod * planetOrbitSpeed).toFixed(2));
            }
            if (typeof moonSpeedCallback !== "undefined") {
                moonSpeedCallback((moonOrbitSpeedMod * moonOrbitSpeed).toFixed(2));
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
    }

    p.checkResize = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        if (w !== p.width || h !== p.height) {
            p.resize();
        }
    }

    p.mousePressed = function (event) {
        if (p.isMouseOverCircle(sunLocation, sunRadius)) {
            isSunBeingDragged = true;
            sunLocationOffset.x = sunLocation.x - p.mouseX;
            sunLocationOffset.y = sunLocation.y - p.mouseY;
        }
    };

    p.mouseReleased = function (event) {
        isSunBeingDragged = false;
        if (isSunBeingDragged) {
            sunLocation.x = p.mouseX + sunLocationOffset.x;
            sunLocation.y = p.mouseY + sunLocationOffset.y;
        }
    };

    p.rebound = function (location, radius) {
        if (location.x > p.width - radius) {
            location.x = p.width - radius;
        }
        if (location.x < radius) {
            location.x = radius;
        }
        if (location.y > p.height - radius) {
            location.y = p.height - radius;
        }
        if (location.y < radius) {
            location.y = radius;
        }
    };

    p.isMouseOverCircle = function (circleLoc, circleRadius) {
        let dx = p.abs(circleLoc.x - p.mouseX);
        let dy = p.abs(circleLoc.y - p.mouseY);
        let distToCircleCenter = p.sqrt(dx * dx + dy * dy);
        return distToCircleCenter <= circleRadius;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // if (didSetup) {
        //     if (typeof newProps.mode !== "undefined") {
        //         currentMode = newProps.mode;
        //     }
        // }
        if (typeof newProps.onFrameRateChange !== "undefined") {
            frameRateCallback = newProps.onFrameRateChange;
        }
        if (typeof newProps.onPlanetSpeedChange !== "undefined") {
            planetSpeedCallback = newProps.onPlanetSpeedChange;
        }
        if (typeof newProps.onMoonSpeedChange !== "undefined") {
            moonSpeedCallback = newProps.onMoonSpeedChange;
        }
    };
}

export default orbiter;
