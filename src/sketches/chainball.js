import p5 from 'p5';

let chainball = (p) => {

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

    p.setup = function() {
        let w = p.select(".App").width - p.select(".Sidebar").width;
        let h = p.select(".App").height;
        p.createCanvas(w, h);
        // p.createCanvas(p.windowWidth, p.windowHeight);
        // canvas.parent('Sketch');
        // canvas.style('display', 'block');

        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
        p.frameRate(60);
        // noCursor();

        core = {
            radius: 25,
            position: p.createVector(p.width / 2, p.height / 2),
            velocity: p.createVector(0, 0),
            acceleration: p.createVector(0, 0),
            minColor: p.color(240, 0, 100),
            maxColor: p.color(240, 100, 100),
            isBeingDragged: false
        };

        for (let i = 0; i < ballCount; i++) {
            let followDist;
            if (i === 0) {
                followDist = defaultFollowDistance + (core.radius - defaultBallRadius);
            } else {
                followDist = defaultFollowDistance;
            }
            balls.push({
                radius: defaultBallRadius,
                position: core.position.copy(),
                velocity: p.createVector(0, 0),
                followDistance: followDist,
                minColor: p.color(0, 0, 100),
                maxColor: p.color(0, 100, 100)
            });
        }

        velocityArrow = {
            minColor: p.color(240, 25, 100),
            maxColor: p.color(240, 100, 100)
        };

        accelerationArrow = {
            minColor: p.color(0, 25, 100),
            maxColor: p.color(0, 100, 100),
        };

        linkingLine = {
            minCompressionColor: p.color(240, 0, 100, 0.5),
            maxCompressionColor: p.color(240, 100, 100, 0.5),
            minTensionColor: p.color(0, 0, 100, 0.5),
            maxTensionColor: p.color(0, 100, 100, 0.5),
            staticColor: p.color(0, 0, 100, 0.5)
        };
    };

    p.draw = function() {
        p.background(0);
        let mouseVector = p.createVector(p.mouseX, p.mouseY);
        let mouseIsOverCanvas =
            p.mouseX > 0 && p.mouseX < p.width &&
            p.mouseY > 0 && p.mouseY < p.height;

        /* DRAWING */

        // draw connecting lines
        if (drawLines) {
            for (let i = 0; i < balls.length; i++) {
                let thisBall = balls[i];
                let parentBall;
                if (i === 0) {
                    parentBall = core;
                } else {
                    parentBall = balls[i - 1];
                }
                p.push();
                p.strokeWeight(5);
                if (currentMode === Modes.STATIC) {
                    p.stroke(linkingLine.staticColor);
                } else {
                    let targetDistance = thisBall.followDistance;
                    let realDistance = p5.Vector.sub(
                        parentBall.position,
                        thisBall.position).mag();
                    p.colorMode(p.RGB);
                    if (targetDistance > realDistance) {
                        p.stroke(p.lerpColor(
                            linkingLine.minCompressionColor,
                            linkingLine.maxCompressionColor,
                            p.reRange(realDistance / targetDistance, 1, 0.5, 0, 1)));
                    } else {
                        p.stroke(p.lerpColor(
                            linkingLine.minTensionColor,
                            linkingLine.maxTensionColor,
                            p.reRange(realDistance / targetDistance, 1, 4, 0, 1)));
                    }
                    p.colorMode(p.HSB);
                }
                p.line(thisBall.position.x, thisBall.position.y, parentBall.position.x, parentBall.position.y);
                p.pop();
            }
        }

        // draw the balls
        balls.forEach(ball => {
            p.fill(ball.minColor);
            p.circle(ball.position.x, ball.position.y, ball.radius * 2);
        })

        // draw the core
        // colorMode(RGB);
        p.fill(core.minColor);
        // colorMode(HSB);
        p.circle(core.position.x, core.position.y, core.radius * 2)

        // draw force arrows
        accelerationArrow.startPosition = p5.Vector.add(core.position, p5.Vector.sub(mouseVector, core.position).setMag(core.radius));
        accelerationArrow.vector = p5.Vector.sub(mouseVector, accelerationArrow.startPosition);
        accelerationArrow.vector.limit(200);

        if (mouseIsOverCanvas && core.forceIsBeingApplied) {
            if (mouseVector.dist(core.position) > core.radius) {
                p.colorMode(p.RGB);
                let accelerationArrowColor = p.lerpColor(
                    accelerationArrow.minColor,
                    accelerationArrow.maxColor,
                    accelerationArrow.vector.mag() / 200);
                p.colorMode(p.HSB);
                p.drawArrow(
                    accelerationArrow.startPosition,
                    accelerationArrow.vector,
                    accelerationArrowColor);
            }
        }

        velocityArrow.startPosition = p5.Vector.add(core.position, core.velocity.copy().setMag(core.radius));
        velocityArrow.vector = core.velocity.copy().mult(10);

        if (core.velocity.mag() > 0.5) {
            p.colorMode(p.RGB);
            let velocityArrowColor = p.lerpColor(
                velocityArrow.minColor,
                velocityArrow.maxColor,
                velocityArrow.vector.mag() / 250);
            p.colorMode(p.HSB);
            p.drawArrow(
                velocityArrow.startPosition,
                velocityArrow.vector,
                velocityArrowColor);
        }

        // draw framerate
        if (p.frameCount % 10 === 0) {
            frameRates.push(p.frameRate());
            if (frameRates.length > 10) {
                frameRates.shift();
            }
            displayFrameRate = frameRates.reduce((sum, num) => {
                return sum + num;
            }) / frameRates.length;
        }
        // $('#framerate').text(`FPS: ${displayFrameRate.toFixed(0)}`);
        p.textSize(32);
        p.fill(p.color(0, 0, 100));
        p.text(`fps: ${displayFrameRate.toFixed(0)}`, 5, 35);
        p.textSize(32);
        p.fill(p.color(0, 0, 100));
        p.text(`ball count: ${balls.length}`, 5, 65);
        p.textSize(32);
        p.fill(p.color(0, 0, 100));
        p.text(`follow dist: ${defaultFollowDistance}`, 5, 95);
        p.textSize(32);
        p.fill(p.color(0, 0, 100));
        p.text(`size: ${p.windowWidth}x${p.windowHeight}`, 5, 125);
        // $('#mode').text(`mode: ${currentMode}`);

        /* UPDATING */

        // update core
        if (mouseIsOverCanvas && core.forceIsBeingApplied && mouseVector.dist(core.position) > core.radius) {
            core.acceleration = p5.Vector.mult(accelerationArrow.vector, 0.0005);
        } else {
            core.acceleration = p.createVector(0, 0);
        }

        core.velocity.add(core.acceleration);
        core.velocity.mult(environmentFriction);

        core.position.add(core.velocity);
        p.rebound(core);


        // update balls
        for (let i = 0; i < balls.length; i++) {
            let thisBall = balls[i];
            let parentBall;
            if (i === 0) {
                parentBall = core;
            } else {
                parentBall = balls[i - 1];
            }

            let toParent = p5.Vector.sub(parentBall.position, thisBall.position);
            toParent.setMag(toParent.mag() - thisBall.followDistance);
            if (currentMode === Modes.STATIC) {
                thisBall.velocity.mult(environmentFriction);
                thisBall.position.add(toParent);
            } else {
                // let goalPosition = p5.Vector.add(thisBall.position, toParent);
                thisBall.acceleration = toParent.mult(0.05);
                thisBall.velocity.add(thisBall.acceleration);
                thisBall.velocity.mult(0.6);
                thisBall.position.add(thisBall.velocity);
            }

            p.rebound(thisBall);

        }

    };

    p.windowResized = function() {
        let w = p.select(".App").width - p.select(".Sidebar").width;
        let h = p.select(".App").height;
        p.resizeCanvas(w, h);
    };

    p.mousePressed = function(event) {
        core.forceIsBeingApplied = true;
    };

    p.mouseReleased = function(event) {
        core.forceIsBeingApplied = false;
    };

    p.keyTyped = function() {
        if (p.key === '=') {
            p.addBall(1);
        } else if (p.key === '-') {
            p.removeBall(1);
        } else if (p.key === '0') {
            p.addBall(10);
        } else if (p.key === '9') {
            p.removeBall(10);
        } else if (p.key === ']') {
            p.modifyFollowDistance(5);
        } else if (p.key === '[') {
            p.modifyFollowDistance(-5);
        } else if (p.key === 'p') {
            p.modifyFollowDistance(50);
        } else if (p.key === 'o') {
            p.modifyFollowDistance(-50);
        } else if (p.key === 'm') {
            if (currentMode === Modes.STATIC) {
                currentMode = Modes.DYNAMIC;
            } else {
                currentMode = Modes.STATIC;
            }
        }
    };

    p.addBall = function(count) {
        for (let i = 0; i < count; i++) {
            balls.push({
                radius: defaultBallRadius,
                position: balls[0].position.copy(),
                velocity: p.createVector(0, 0),
                followDistance: defaultFollowDistance,
                minColor: p.color(0, 0, 100),
                maxColor: p.color(0, 100, 100)
            });
        }
    };

    p.removeBall = function(count) {
        for (let i = 0; i < count && balls.length > 1; i++) {
            balls.pop();
        }
    };

    p.modifyFollowDistance = function(delta) {
        if (defaultFollowDistance + delta >= 0) {
            balls.forEach(ball => {
                ball.followDistance += delta;
            });
            defaultFollowDistance += delta;
        }
    };

    p.rebound = function(ball) {
        if (ball.position.x > p.width - ball.radius) {
            ball.position.x = p.width - ball.radius;
            ball.velocity.x *= -1;
        }
        if (ball.position.x < ball.radius) {
            ball.position.x = ball.radius;
            ball.velocity.x *= -1;
        }
        if (ball.position.y > p.height - ball.radius) {
            ball.position.y = p.height - ball.radius;
            ball.velocity.y *= -1;
        }
        if (ball.position.y < ball.radius) {
            ball.position.y = ball.radius;
            ball.velocity.y *= -1;
        }
    };

    p.drawArrow = function(fromVector, toVector, arrowColor) {
        p.push();
        p.stroke(arrowColor);
        p.strokeWeight(2);
        p.fill(arrowColor);
        p.translate(fromVector.x, fromVector.y);
        p.line(0, 0, toVector.x, toVector.y);
        p.rotate(toVector.heading());
        let arrowSize = 3;
        p.translate(toVector.mag() - arrowSize, 0);
        p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        p.pop();
    };

    p.reRange = function(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };

    p.myCustomRedrawAccordingToNewPropsHander = (newProps) => {

    };

};

export default chainball;