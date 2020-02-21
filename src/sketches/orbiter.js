let planetAngle = 0.0;
let moonAngle = 0.0;

let planetOrbitRadius = 100.0;
let moonOrbitRadius = 15.0;

let planetOrbitSpeed = 0.4
let moonOrbitSpeed = 4.5

let sunRadius = 25.0;
let planetRadius = 5.0;
let moonRadius = 2.5;

let sunLocation = [0, 0]

let planetOrbitSpeedMod = 1.0;
let moonOrbitSpeedMod = 1.0;

let deltaTimeOffset = 0.05;

let isSunBeingDragged = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    sunLocation = [width / 2, height / 2]

    colorMode(HSB);
    angleMode(DEGREES);
    // noCursor();

    background(0);
    fill(0);
}

function draw() {
    if (isSunBeingDragged) {
        sunLocation[0] += movedX;
        sunLocation[1] += movedY;
    }
    background(0);

    planetOrbitSpeedMod = sq((sunLocation[0] / width) * 6.0);
    moonOrbitSpeedMod = sq((sunLocation[1] / height) * 3.0);

    // get some positions
    sunX = sunLocation[0];
    sunY = sunLocation[1];
    planetX = sunX + planetOrbitRadius*cos(planetAngle)
    planetY = sunY + planetOrbitRadius*sin(planetAngle)
    moonX = planetX + moonOrbitRadius*cos(moonAngle)
    moonY = planetY + moonOrbitRadius*sin(moonAngle)

    // sun
    fill(0, 0, 100)
    circle(sunX, sunY, sunRadius*2);
    // planet
    fill(0, 0, 100)
    circle(planetX, planetY, planetRadius*2);
    // moon
    fill(0, 0, 100)
    circle(moonX, moonY, moonRadius*2);
    planetAngle += deltaTimeOffset*deltaTime*planetOrbitSpeedMod*planetOrbitSpeed;
    moonAngle += deltaTimeOffset*deltaTime*moonOrbitSpeedMod*moonOrbitSpeed;
    planetAngle = planetAngle % 360;
    moonAngle = moonAngle % 360;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(event) {
    if (isMouseOverCircle(sunLocation, sunRadius)) {
        isSunBeingDragged = true;
    }
}

function mouseReleased(event) {
    isSunBeingDragged = false;
}

function isMouseOverCircle(circleLoc, circleRadius) {
    let dx = abs(circleLoc[0] - mouseX);
    let dy = abs(circleLoc[1] - mouseY);
    let distToCircleCenter = sqrt(dx*dx + dy*dy);
    return distToCircleCenter <= circleRadius;
}