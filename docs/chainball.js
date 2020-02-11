let core;
let balls = [];
let frameRates = [];
let displayFrameRate = 0;

const Modes = {
    STATIC: "Static",
    DYNAMIC: "Dynamic"
};

let currentMode = Modes.STATIC;

let ballCount = 2;
let environmentFriction = 0.9995;

let drawLines = true;

let defaultFollowDistance = 50;
let defaultBallRadius = 10;

let velocityArrow;
let accelerationArrow;
let linkingLine;

function setup() {
    let canvas = createCanvas(windowWidth-250, windowHeight);
    canvas.parent('sketch-chainball');
    canvas.style('display', 'block');

    colorMode(HSB);
    angleMode(DEGREES);
    frameRate(60);
    // noCursor();

    core = {
        radius: 25,
        position: createVector(width/2, height/2),
        velocity: createVector(0, 0),
        acceleration: createVector(0, 0),
        minColor: color(240, 0, 100),
        maxColor: color(240, 100, 100),
        isBeingDragged: false
    };

    for (let i=0; i<ballCount; i++) {
        let followDist;
        if (i === 0) {
            followDist = defaultFollowDistance + (core.radius - defaultBallRadius);
        } else {
            followDist = defaultFollowDistance;
        }
        balls.push({
            radius: defaultBallRadius,
            position: core.position.copy(),
            velocity: createVector(0, 0),
            followDistance: followDist,
            minColor: color(0, 0, 100),
            maxColor: color(0, 100, 100)
        });
    }

    velocityArrow = {
        minColor: color(240, 25, 100),
        maxColor: color(240, 100, 100)
    };

    accelerationArrow = {
        minColor: color(0, 25, 100),
        maxColor: color(0, 100, 100),
    };

    linkingLine = {
        minCompressionColor: color(240, 0, 100, 0.5),
        maxCompressionColor: color(240, 100, 100, 0.5),
        minTensionColor: color(0, 0, 100, 0.5),
        maxTensionColor: color(0, 100, 100, 0.5),
        staticColor: color(0, 0, 100, 0.5)
    };
}

function draw() {
    background(0);
    let mouseVector = createVector(mouseX, mouseY);
    let mouseIsOverCanvas = 
        mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height;

    /* DRAWING */

    // draw connecting lines
    if (drawLines) {
        for (let i=0; i<balls.length; i++) {
            let thisBall = balls[i];
            let parentBall;
            if (i === 0) {
                parentBall = core;
            } else {
                parentBall = balls[i-1];
            }
            push();
            strokeWeight(5);
            if (currentMode === Modes.STATIC) {
                stroke(linkingLine.staticColor);
            } else {
                let targetDistance = thisBall.followDistance;
                let realDistance = p5.Vector.sub(
                    parentBall.position,
                    thisBall.position).mag();
                colorMode(RGB);
                if (targetDistance > realDistance) {
                    stroke(lerpColor(
                        linkingLine.minCompressionColor, 
                        linkingLine.maxCompressionColor,
                        reRange(realDistance/targetDistance, 1, 0.5, 0, 1)));
                } else {
                    stroke(lerpColor(
                        linkingLine.minTensionColor, 
                        linkingLine.maxTensionColor,
                        reRange(realDistance/targetDistance, 1, 4, 0, 1)));
                }
                colorMode(HSB);
            }
            line(thisBall.position.x, thisBall.position.y, parentBall.position.x, parentBall.position.y);
            pop();
        }
    }

    // draw the balls
    balls.forEach(ball => {
        ball.followDistance = $('#testslider').slider("value")
        fill(ball.minColor);
        circle(ball.position.x, ball.position.y, ball.radius*2);
    })

    // draw the core
    // colorMode(RGB);
    fill(core.minColor);
    // colorMode(HSB);
    circle(core.position.x, core.position.y, core.radius*2)

    // draw force arrows
    accelerationArrow.startPosition = p5.Vector.add(core.position, p5.Vector.sub(mouseVector, core.position).setMag(core.radius));
    accelerationArrow.vector = p5.Vector.sub(mouseVector, accelerationArrow.startPosition);
    accelerationArrow.vector.limit(200);

    if (mouseIsOverCanvas && core.forceIsBeingApplied){
        if (mouseVector.dist(core.position) > core.radius) {
            colorMode(RGB);
            let accelerationArrowColor = lerpColor(
                accelerationArrow.minColor, 
                accelerationArrow.maxColor, 
                accelerationArrow.vector.mag()/200);
            colorMode(HSB);
            drawArrow(
                accelerationArrow.startPosition, 
                accelerationArrow.vector, 
                accelerationArrowColor);
        }
    }

    velocityArrow.startPosition = p5.Vector.add(core.position, core.velocity.copy().setMag(core.radius));
    velocityArrow.vector = core.velocity.copy().mult(10);

    if (core.velocity.mag() > 0.5) {
        colorMode(RGB);
        let velocityArrowColor = lerpColor(
            velocityArrow.minColor, 
            velocityArrow.maxColor, 
            velocityArrow.vector.mag()/250);
        colorMode(HSB);
        drawArrow(
            velocityArrow.startPosition, 
            velocityArrow.vector, 
            velocityArrowColor);
    }

    // draw framerate
    if (frameCount % 10 == 0) {
        frameRates.push(frameRate());
        if (frameRates.length > 10) {
            frameRates.shift();
        }
        displayFrameRate = frameRates.reduce((sum, num) => {
            return sum + num;
        }) / frameRates.length;
    }
    $('#framerate').text(`FPS: ${displayFrameRate.toFixed(0)}`);
    textSize(32);
    fill(color(0, 0, 100));
    text(`ball count: ${balls.length}`, 5, 65);
    textSize(32);
    fill(color(0, 0, 100));
    text(`follow dist: ${defaultFollowDistance}`, 5, 95);
    $('#mode').text(`mode: ${currentMode}`);

    /* UPDATING */

    // update core
    if (mouseIsOverCanvas && core.forceIsBeingApplied && mouseVector.dist(core.position) > core.radius){
        core.acceleration = p5.Vector.mult(accelerationArrow.vector, 0.0005);
    } else {
        core.acceleration = createVector(0, 0);
    }

    core.velocity.add(core.acceleration);
    core.velocity.mult(environmentFriction);

    core.position.add(core.velocity);
    rebound(core);


    // update balls
    for (let i=0; i<balls.length; i++) {
        let thisBall = balls[i];
        let parentBall;
        if (i === 0) {
            parentBall = core;
        } else {
            parentBall = balls[i-1];
        }

        let toParent = p5.Vector.sub(parentBall.position, thisBall.position);
        toParent.setMag(toParent.mag() - thisBall.followDistance);
        if (currentMode === Modes.STATIC) {
            thisBall.velocity.mult(environmentFriction);
            thisBall.position.add(toParent);
        } else {
            let goalPosition = p5.Vector.add(thisBall.position, toParent);
            thisBall.acceleration = toParent.mult(0.05);
            thisBall.velocity.add(thisBall.acceleration);
            thisBall.velocity.mult(0.6);
            thisBall.position.add(thisBall.velocity);
        }

        rebound(thisBall);

    }
    
}

function windowResized() {
    resizeCanvas(windowWidth-250, windowHeight);
}

function mousePressed(event) {
    core.forceIsBeingApplied = true;
}

function mouseReleased(event) {
    core.forceIsBeingApplied = false;
}

function keyTyped() {
    if (key === '=') {
        addBall(1);
    } else if (key === '-') {
        removeBall(1);
    } else if (key === '0') {
        addBall(10);
    } else if (key === '9') {
        removeBall(10);
    } else if (key === ']') {
        modifyFollowDistance(5);
    } else if (key === '[') {
        modifyFollowDistance(-5);
    } else if (key === 'p') {
        modifyFollowDistance(50);
    } else if (key === 'o') {
        modifyFollowDistance(-50);
    } else if (key === 'm') {
        if (currentMode === Modes.STATIC) {
            currentMode = Modes.DYNAMIC;
        } else {
            currentMode = Modes.STATIC;
        }
    }
}

function addBall(count) {
    for (let i=0; i<count; i++) {
        balls.push({
            radius: defaultBallRadius,
            position: balls[0].position.copy(),
            velocity: createVector(0, 0),
            followDistance: defaultFollowDistance,
            minColor: color(0, 0, 100),
            maxColor: color(0, 100, 100)
        }); 
    }
}

function removeBall(count) {
    for (let i=0; i<count && balls.length>1; i++) {
        balls.pop(); 
    }
}

function modifyFollowDistance(delta) {
    if (defaultFollowDistance + delta >= 0) {
        balls.forEach(ball => {
                ball.followDistance += delta;
        });
        defaultFollowDistance += delta;
    }
}

function rebound(ball) {
    if (ball.position.x > width - ball.radius) {
        ball.position.x = width - ball.radius;
        ball.velocity.x *= -1;
    }
    if (ball.position.x < ball.radius) {
        ball.position.x = ball.radius;
        ball.velocity.x *= -1;
    }
    if (ball.position.y > height - ball.radius) {
        ball.position.y = height - ball.radius;
        ball.velocity.y *= -1;
    }
    if (ball.position.y < ball.radius) {
        ball.position.y = ball.radius;
        ball.velocity.y *= -1;
    }
}

function drawArrow(fromVector, toVector, arrowColor) {
    push();
    stroke(arrowColor);
    strokeWeight(2);
    fill(arrowColor);
    translate(fromVector.x, fromVector.y);
    line(0, 0, toVector.x, toVector.y);
    rotate(toVector.heading());
    let arrowSize = 3;
    translate(toVector.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function reRange(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}