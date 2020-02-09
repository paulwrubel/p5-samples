let core;
let balls = [];

let ballCount = 5;
let environmentFriction = 0.9995;

let drawLines = true;

let defaultFollowDistance = 60;
let defaultBallRadius = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB);
    angleMode(DEGREES);
    // noCursor();

    core = {
        radius: 25,
        position: createVector(width/2, height/2),
        velocity: createVector(0, 0),
        acceleration: createVector(0, 0),
        color: color(0, 0, 100),
        isBeingDragged: false
    }

    for (let i=0; i<ballCount; i++) {
        balls.push({
            radius: defaultBallRadius,
            position: core.position.copy().add(i+1, i+1),
            velocity: createVector(0, 0),
            followDistance: defaultFollowDistance,
            color: color(0, 0, 100)
        });
    }
}

function draw() {
    background(0);
    let mouseVector = createVector(mouseX, mouseY);

    // get some positions

    // reposition the core if needed
    let coreForceArrowStartPosition = p5.Vector.add(core.position, p5.Vector.sub(mouseVector, core.position).setMag(core.radius));
    let coreForceArrowVector = p5.Vector.sub(mouseVector, coreForceArrowStartPosition);

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
            stroke(color(0, 0, 50));
            line(thisBall.position.x, thisBall.position.y, parentBall.position.x, parentBall.position.y);
            pop();
        }
    }

    // draw the balls
    balls.forEach(ball => {
        fill(ball.color);
        circle(ball.position.x, ball.position.y, ball.radius*2);
    })

    // draw the core
    fill(core.color);
    circle(core.position.x, core.position.y, core.radius*2)

    // draw force arrows
    if (core.forceIsBeingApplied){
        if (mouseVector.dist(core.position) > core.radius) {
            let coreForceColor = color(0, 50+0.3*coreForceArrowVector.mag(), 100)
            drawArrow(coreForceArrowStartPosition, coreForceArrowVector, coreForceColor);
        }
    }

    // update core
    if (core.forceIsBeingApplied && mouseVector.dist(core.position) > core.radius){
        core.acceleration = p5.Vector.mult(coreForceArrowVector, 0.0005);
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
        thisBall.position.add(toParent);
        thisBall.velocity.mult(environmentFriction);

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