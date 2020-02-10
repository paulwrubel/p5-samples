let core;
let balls = [];
let frameRates = [];
let displayFrameRate = 0;

let ballCount = 5;
let environmentFriction = 0.9995;

let drawLines = true;

let defaultFollowDistance = 50;
let defaultBallRadius = 10;

let velocityArrow;
let accelerationArrow;

function setup() {
    createCanvas(windowWidth, windowHeight);

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
        if (i === ballCount-1) {
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
}

function draw() {
    background(0);
    let mouseVector = createVector(mouseX, mouseY);

    /* DRAWING */

    // draw connecting lines
    if (drawLines) {
        for (let i=0; i<balls.length; i++) {
            let thisBall = balls[i];
            let parentBall;
            if (i === balls.length-1) {
                parentBall = core;
            } else {
                parentBall = balls[i+1];
            }
            push();
            strokeWeight(5);
            stroke(color(0, 0, 100, 0.5));
            line(thisBall.position.x, thisBall.position.y, parentBall.position.x, parentBall.position.y);
            pop();
        }
    }

    // draw the balls
    balls.forEach(ball => {
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

    if (core.forceIsBeingApplied){
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
    textSize(32);
    fill(color(0, 0, 100));
    text(`${displayFrameRate.toFixed(0)}`, 5, 35);


    /* UPDATING */
    // update core
    if (core.forceIsBeingApplied && mouseVector.dist(core.position) > core.radius){
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
        if (i === balls.length-1) {
            parentBall = core;
        } else {
            parentBall = balls[i+1];
        }

        let toParent = p5.Vector.sub(parentBall.position, thisBall.position);
        toParent.setMag(toParent.mag() - thisBall.followDistance);
        thisBall.velocity.mult(environmentFriction);
        thisBall.position.add(toParent);

        rebound(thisBall);

    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(event) {
    core.forceIsBeingApplied = true;
}

function mouseReleased(event) {
    core.forceIsBeingApplied = false;
}

function keyTyped() {
    if (key === '=') {
        addBall();
    } else if (key === '-') {
        removeBall();
    } else if (key === ']') {
        modifyFollowDistance(5);
    } else if (key === '[') {
        modifyFollowDistance(-5);
    }
}

function addBall() {
    balls.unshift({
        radius: defaultBallRadius,
        position: balls[0].position.copy(),
        velocity: createVector(0, 0),
        followDistance: balls[0].followDistance,
        minColor: color(0, 0, 100),
        maxColor: color(0, 100, 100)
    }); 
}

function removeBall() {
    if (balls.length > 1) {
    balls.shift();  
    }
}

function modifyFollowDistance(delta) {
    if (delta > 0 || balls[0].followDistance > balls[0].radius*2) {
        balls.forEach(ball => {
                ball.followDistance += delta;
        })
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