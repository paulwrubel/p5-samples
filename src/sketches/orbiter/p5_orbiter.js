let orbiter = (p) => {

    let planetAngle = 0.0;
    let moonAngle = 0.0;

    let planetOrbitRadius = 100.0;
    let moonOrbitRadius = 15.0;

    let planetOrbitSpeed = 0.4
    let moonOrbitSpeed = 4.5

    let sunRadius = 25.0;
    let planetRadius = 5.0;
    let moonRadius = 2.5;

    let sunLocation = [0, 0];

    let planetOrbitSpeedMod = 1.0;
    let moonOrbitSpeedMod = 1.0;

    let deltaTimeOffset = 0.05;

    let isSunBeingDragged = false;

    p.setup = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.createCanvas(w, h);

        sunLocation = [p.width / 2, p.height / 2]

        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
        // noCursor();

        p.background(0);
        p.fill(0);
    };

    p.draw = function () {
        if (isSunBeingDragged) {
            sunLocation[0] += p.movedX;
            sunLocation[1] += p.movedY;
        }
        p.background(0);

        planetOrbitSpeedMod = p.sq((sunLocation[0] / p.width) * 6.0);
        moonOrbitSpeedMod = p.sq((sunLocation[1] / p.height) * 3.0);

        // get some positions
        let sunX = sunLocation[0];
        let sunY = sunLocation[1];
        let planetX = sunX + planetOrbitRadius * p.cos(planetAngle)
        let planetY = sunY + planetOrbitRadius * p.sin(planetAngle)
        let moonX = planetX + moonOrbitRadius * p.cos(moonAngle)
        let moonY = planetY + moonOrbitRadius * p.sin(moonAngle)

        // sun
        p.fill(0, 0, 100)
        p.circle(sunX, sunY, sunRadius * 2);
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
    };

    p.windowResized = function() {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.resizeCanvas(w, h);
    };

    p.mousePressed = function(event) {
        if (p.isMouseOverCircle(sunLocation, sunRadius)) {
            isSunBeingDragged = true;
        }
    };

    p.mouseReleased = function(event) {
        isSunBeingDragged = false;
    };

    p.isMouseOverCircle = function(circleLoc, circleRadius) {
        let dx = p.abs(circleLoc[0] - p.mouseX);
        let dy = p.abs(circleLoc[1] - p.mouseY);
        let distToCircleCenter = p.sqrt(dx * dx + dy * dy);
        return distToCircleCenter <= circleRadius;
    };
}

export default orbiter;
