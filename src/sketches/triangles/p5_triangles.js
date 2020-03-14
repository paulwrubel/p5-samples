import ControlsBox from "./p5_controlsbox";
import Triangle from "./p5_triangle"
import GravityMode from "./p5_gravitymode"

let triangles = (p) => {

    // Required for all sketches
    let updateFrequency = 10;
    let frameRates = [];
    let displayFrameRate;

    let frameRateCallback;
    let triangleCountCallback;
    let bulletCountCallback;

    let informationCallback;

    let didSetup = false;

    // Timing stuff
    let triangleUpdateTime;
    let triangleDrawTime;
    let bulletUpdateTime;
    let bulletDrawTime;

    // Gravity Enum replacement

    const GenerationMode = {
        DISCRETE: "discrete",
        CONTINUOUS: "continuous",
    };
    // CONSTANTS

    /**
     * Controls Saturation and Brightness values of screen background
     * Ranges from 0 - 100
     */
    const SAT = 20;
    const BRIGHT = 100;

    /**
     * Stroke weight for the window border and crosshairs
     * Ranges from 0 - INF
     */
    const BORDER_WEIGHT = 12;
    const CROSSHAIRS_WEIGHT = 5;

    /**
     * Limit of the amount of Triangles and Bullets in the window
     * Ranges from 0 - INF
     */
    const TRIANGLE_LIMIT = 500;
    const BULLET_LIMIT = 1500;

    /**
     * Frequency of the creation (and removal) of Triangles and Bullets in dynamic mode
     * 1 writes every frame, 5 every 5 frames, and so on.
     * Lower values are faster
     * Ranges from 1 - INF
     */
    const TRIANGLE_ADD_FREQ = 4;
    const TRIANGLE_REMOVE_FREQ = 4;
    const BULLET_FREQ = 4;

    // Initials for this sketch
    let generationMode = GenerationMode.DISCRETE;
    let isBorderEnabled = false;

    let gravityMode = GravityMode.OFF;
    let decay = 0.99;

    let fixedPoint = null;
    let isAutoFireEnabled = false;

    let controls = new ControlsBox(p);
    let gravList = [];
    let gravPoint;
    let triangles = [];
    let bulletCount = 0;

    let mouseButtons = [];
    let keys = [];
    let keysSize = 128;
    let keyCodes = [];

    p.setup = function () {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        let c = p.createCanvas(w, h);
        p.disableRightClick(c.canvas);

        p.frameRate(60);

        //  Initial values
        gravPoint = p.createVector(p.width / 2, p.height / 2);

        //  Hue, Saturation, Brightness, and ranges
        p.colorMode(p.HSB, 360, 100, 100, 100);
        //  Ellipses are drawn from centre and distances are radii
        p.ellipseMode(p.RADIUS);
        //  Background begins black
        p.background(p.color(0, 0, 0));

        didSetup = true;
    };

    p.draw = function () {
        p.checkResize();

        let superStart = window.performance.now();

        // START SKETCH

        //  Set hue based on horizontal mouse position
        let hue = p.map(p.mouseX, 0, p.width, 0, 360);
        p.background(hue, SAT, BRIGHT, 100);

        //  Draw border around effective "window", if bounce is set
        //  to show the bouncing "walls"
        if (isBorderEnabled) {
            p.fill(p.color(0, 0, 0));
            p.noStroke();
            p.rectMode(p.CORNER);
            //  Top Border
            p.rect(0, 0, p.width, BORDER_WEIGHT);
            //  Left Border
            p.rect(0, 0, BORDER_WEIGHT, p.height);
            //  Bottom Border
            p.rect(0, p.height - BORDER_WEIGHT, p.width, BORDER_WEIGHT);
            //  Right Border
            p.rect(p.width - BORDER_WEIGHT, 0, BORDER_WEIGHT, p.height);
        }

        //  Draw red border signifying outer bullet perimeter
        //  and frame border
        p.fill(p.color(0, 100, 100));
        p.noStroke();
        p.rectMode(p.CORNER);
        //  Top Border
        p.rect(0 - BORDER_WEIGHT, 0 - BORDER_WEIGHT, p.width + BORDER_WEIGHT * 2, BORDER_WEIGHT);
        //  Left Border
        p.rect(0 - BORDER_WEIGHT, 0 - BORDER_WEIGHT, BORDER_WEIGHT, p.height + BORDER_WEIGHT * 2);
        //  Bottom Border
        p.rect(0 - BORDER_WEIGHT, p.height, p.width + BORDER_WEIGHT * 2, BORDER_WEIGHT);
        //  Right Border
        p.rect(p.width, 0 - BORDER_WEIGHT, BORDER_WEIGHT, p.height + BORDER_WEIGHT * 2);

        p.stroke(p.color(0, 0, 0));
        if (gravityMode === GravityMode.POINT) {
            //  Draw Gravity Point
            p.stroke(p.color(0, 0, 0));
            p.strokeWeight(2);
            p.fill(p.color(0, 0, 100));
            p.ellipse(gravPoint.x, gravPoint.y, 4, 4);
        } else if (gravityMode === GravityMode.MULTI_POINT) {
            p.stroke(p.color(0, 0, 0));
            p.strokeWeight(2);
            p.fill(p.color(0, 0, 100));
            gravList.forEach((v => {
                p.ellipse(v.x, v.y, 4, 4);
            }));

        }

        //  Draw crosshairs
        p.stroke(p.color(0, 100, 100));
        p.strokeWeight(CROSSHAIRS_WEIGHT);
        p.line(p.mouseX, p.mouseY - 10, p.mouseX, p.mouseY + 10);
        p.line(p.mouseX - 10, p.mouseY, p.mouseX + 10, p.mouseY);


        //  Initial values for timing vars
        let start;
        let end;

        bulletCount = 0;

        start = window.performance.now();
        triangles.forEach(triangle => {
            triangle.bullets.forEach(bullet => {

                bullet.update();
                //b.draw();

            });
        });
        end = window.performance.now();
        bulletUpdateTime = (end - start);

        start = window.performance.now();
        triangles.forEach(triangle => {
            triangle.bullets.forEach(bullet => {

                //b.update();
                bullet.draw();

            });
        });
        end = window.performance.now();
        bulletDrawTime = (end - start);

        start = window.performance.now();
        triangles.forEach(triangle => {

            triangle.update();
            // triangle.draw();

            bulletCount += triangle.bullets.length;
        });
        end = window.performance.now();
        triangleUpdateTime = (end - start);

        start = window.performance.now();
        triangles.forEach(triangle => {

            // triangle.update();
            triangle.draw();

            // bulletCount += triangle.bullets.length;
        });
        end = window.performance.now();
        triangleDrawTime = (end - start);

        //  Only if in dynamic mode
        //  Check for mouse buttons and key presses and perform actions accordingly
        if (generationMode === GenerationMode.CONTINUOUS) {
            //  Add Triangles
            if (mouseButtons[p.RIGHT] && p.frameCount % TRIANGLE_ADD_FREQ === 0) {
                p.handleAdd();
            }
            //  Remove Triangles
            if (keys[p.BACKSPACE] && (p.frameCount % TRIANGLE_REMOVE_FREQ) === 0) {
                if (triangles.length > 0) {
                    triangles.remove(0);
                }
            }
            //  Add Bullets
            if ((mouseButtons[p.LEFT] || isAutoFireEnabled) && (p.frameCount % BULLET_FREQ) === 0) {
                triangles.forEach(triangle => {
                    if (bulletCount < BULLET_LIMIT) {
                        triangle.addBullet();
                    }
                });
            }
        }

        //  Print basic debug text to screen
        //  Text is written to top left corner of window
            p.textSize(12);
            p.fill(0);
            p.strokeWeight(0);
            // p.textMode(p.SHAPE);
            p.textAlign(p.LEFT);

            let yLoc = 30;
            p.text(`TIME: ${window.performance.now() - superStart}`, 50, yLoc);
            yLoc += 20;
            // let yLoc = 50;
            p.text("X: " + p.mouseX, 50, yLoc);
            yLoc += 20;
            p.text("Y: " + p.mouseY, 50, yLoc);
            yLoc += 20;
            p.text("Triangle Count: " + triangles.length, 50, yLoc);
            yLoc += 20;
            p.text("Bullet Count: " + bulletCount, 50, yLoc);
            yLoc += 20;
            let triangleText = `Triangle Time: ~${triangleUpdateTime.toFixed(2)}ms`;
            let bulletUpdateText = `Bullet Update Time: ~${bulletUpdateTime.toFixed(2)}ms`;
            let bulletDrawText = `Bullet Draw Time: ~${bulletDrawTime.toFixed(2)}ms`;
            let FPSText = `FPS: ${p.frameRate().toFixed(2)}`;
            p.text(triangleText, 50, yLoc);
            yLoc += 20;
            p.text(bulletUpdateText, 50, yLoc);
            yLoc += 20;
            p.text(bulletDrawText, 50, yLoc);
            yLoc += 20;
            p.text(FPSText, 50, yLoc);
            yLoc += 20;
            if (isBorderEnabled) {
                p.text("Bounce: ON", 50, yLoc);
            } else {
                p.text("Bounce: OFF", 50, yLoc);
            }
            yLoc += 20;
            if (gravityMode === GravityMode.OFF) {
                p.text("Decay: OFF", 50, yLoc);
            } else {
                p.text("Decay: " + decay, 50, yLoc);
            }
            yLoc += 20;
            p.text("Gravity Mode: " + gravityMode, 50, yLoc);

        // END SKETCH

        p.calculateFrameRate();
        p.updateCallbacks();
    };

    p.handleAdd = function () {
        if (triangles.length !== 0) {
            //  Make sure the mouse is in a different position
            if (p.mouseX !== triangles[triangles.length - 1].pos.x || p.mouseY !== triangles[triangles.length - 1].pos.y) {
                triangles.push(new Triangle(p, p.createVector(p.mouseX, p.mouseY)));
                //  Remove oldest
                if (triangles.length > TRIANGLE_LIMIT) {
                    triangles.shift();
                }
            }
        } else {
            //  If brand-new, just add one!
            triangles.push(new Triangle(p, p.createVector(p.mouseX, p.mouseY)));
        }
    };

    p.isBounceEnabled = function () {
        return isBorderEnabled;
    }

    p.getGravityMode = function () {
        return gravityMode;
    }

    p.getGravityPoint = function () {
        if (gravityMode === GravityMode.SIMPLE || gravityMode === GravityMode.TRUE) {
            return p.createVector(p.mouseX, p.mouseY);
        } else {
            return gravPoint;
        }
    };

    p.getGravityList = function () {
        return gravList;
    };

    p.getDecay = function () {
        return decay;
    }

    p.getAimPoint = function () {
        console.log()
        if (fixedPoint != null) {
            return fixedPoint;
        } else {
            return p.createVector(p.mouseX, p.mouseY);
        }
    };

    p.getKeyCodes = function () {
        return keyCodes;
    };

    p.getBounceMode = function () {
        return isBorderEnabled;
    };

    p.getBorderWeight = function () {
        return BORDER_WEIGHT;
    }

    p.keyPressed = function (event) {

        //  Get key data
        let k = p.key;
        let kc = p.keyCode;

        if (k < keysSize) {
            keys[k] = true;
        } else {
            keyCodes[kc] = true;
        }

        // Handle key data
        // if (kc === p.ENTER) {
        //     generationMode = generationMode === GenerationMode.DISCRETE ? GenerationMode.CONTINUOUS : GenerationMode.DISCRETE;
        // }
        if (k === 'f') {
            if (fixedPoint !== null) {
                fixedPoint = null;
            } else {
                fixedPoint = p.createVector(p.mouseX, p.mouseY);
            }
        }
        // if (k === 'a') {
        //     isAutoFireEnabled = !isAutoFireEnabled;
        // }
        if (k === ' ') {
            triangles = [];
        }
        // if (k === 'b') {
        //     isBorderEnabled = !isBorderEnabled;
        // }
        if (k === 'c') {
            triangles.forEach(triangle => {
                triangle.bullets = [];
            });
        }
        if (k === 'g') {
            if (gravityMode === GravityMode.POINT) {
                gravPoint = p.createVector(p.mouseX, p.mouseY);
            } else if (gravityMode === GravityMode.MULTI_POINT) {
                gravList.push(p.createVector(p.mouseX, p.mouseY));
            }
        }
        if (k === 'r') {
            if (gravityMode === GravityMode.POINT) {
                gravPoint = p.createVector(p.width / 2, p.height / 2);
            } else if (gravityMode === GravityMode.MULTI_POINT) {
                gravList = [];
            }
        }
        // if (k === '1') {
        //     gravityMode = GravityMode.OFF;
        // }
        // if (k === '2') {
        //     gravityMode = GravityMode.SIMPLE;
        // }
        // if (k === '3') {
        //     gravityMode = GravityMode.TRUE;
        // }
        // if (k === '4') {
        //     gravityMode = GravityMode.POINT;
        // }
        // if (k === '5') {
        //     gravityMode = GravityMode.MULTI_POINT;
        // }
        if (generationMode === GenerationMode.DISCRETE) {
            if (kc === p.BACKSPACE) {
                if (triangles.length !== 0) {
                    triangles.shift();
                }
            }
        }
    };



    /**
     * Is called once when a key is released
     *
     * @param event event holding data about the released key
     */
    p.keyReleased = function (event) {
        let k = event.key;
        let kc = event.keyCode;

        //  Simply set corresponding array pos to false;
        if (k < keys.length) {
            keys[k] = false;
        } else {
            keyCodes[kc] = false;
        }
    }

    /**
     * Is called once when a mouse button is pressed
     *
     * @param event event containing mouse button info
     */

    p.mousePressed = function (event) {
        let mb = p.mouseButton;

        //  Set array position to true
        mouseButtons[mb] = true;

        if (mb === p.CENTER) {

        }

        //  Handle mouse button actions
        if (generationMode === GenerationMode.DISCRETE) {
            if (mb === p.LEFT) {
                triangles.forEach(triangle => {
                    if (bulletCount < BULLET_LIMIT) {
                        triangle.addBullet();
                    }
                });
            }
            if (mb === p.RIGHT) {
                p.handleAdd();
            }
        }
    }

    /**
     * Is called once when a mouse button is released
     *
     * @param event event containing data about the mouse button released
     */

    p.mouseReleased = function (event) {
        let mb = p.mouseButton;

        //  Simply set position to false
        mouseButtons[mb] = false;
    };

    p.calculateFrameRate = function () {
        if (p.frameCount % updateFrequency === 0) {
            frameRates.push(p.frameRate());
            if (frameRates.length > 10) {
                frameRates.shift();
            }
            displayFrameRate = frameRates.reduce((sum, num) => {
                return sum + num;
            }) / frameRates.length;
        }
    }

    p.updateCallbacks = function () {
        if (p.frameCount % updateFrequency === 0) {
            if (typeof frameRateCallback !== "undefined") {
                frameRateCallback(displayFrameRate.toFixed(0));
            }

            if (typeof informationCallback !== "undefined") {
                informationCallback(new Map([
                    ["frame_rate", "FPS: " + displayFrameRate.toFixed(0)],
                    ["triangle_count", "Triangles: " + triangles.length],
                    ["bullet_count", "Bullets: " + bulletCount],
                    ["triangle_update_time", "Triangle Update Time: " + triangleUpdateTime + "ms"],
                    ["bullet_update_time", "Bullet Update Time: " + bulletUpdateTime + "ms"],
                    ["triangle_draw_time", "Triangle Draw Time: " + triangleDrawTime + "ms"],
                    ["bullet_draw_time", "Bullet Draw Time: " + bulletDrawTime + "ms"],
                ]));
            }
            // if (typeof activeTrailCountCallback !== "undefined") {
            //     activeTrailCountCallback(trails.length);
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

    p.disableRightClick = function (c) {
        c.oncontextmenu = function (event) {
            event.preventDefault();
            return false;
        }
    }

    p.windowResized = function () {
        p.resize();
    };

    p.resize = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.resizeCanvas(w, h);

        p.background(0);
    };

    p.checkResize = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        if (w !== p.width || h !== p.height) {
            p.resize();
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // sketch components
        if (didSetup) {
            if (typeof newProps.generationMode !== "undefined") {
                if (generationMode !== newProps.generationMode) {
                    generationMode = newProps.generationMode;
                }
            }
            if (typeof newProps.gravityMode !== "undefined") {
                if (gravityMode !== newProps.gravityMode) {
                    gravityMode = newProps.gravityMode;
                }
            }
            if (typeof newProps.isBorderEnabled !== "undefined") {
                if (isBorderEnabled !== newProps.isBorderEnabled) {
                    isBorderEnabled = newProps.isBorderEnabled;
                }
            }
            if (typeof newProps.isAutoFireEnabled !== "undefined") {
                if (isAutoFireEnabled !== newProps.isAutoFireEnabled) {
                    isAutoFireEnabled = newProps.isAutoFireEnabled;
                }
            }
        }

        // info callbacks
        if (typeof newProps.onFrameRateChange !== "undefined") {
            if (typeof frameRateCallback === "undefined") {
                frameRateCallback = newProps.onFrameRateChange;
            }
        }
        if (typeof newProps.onTriangleCountChange !== "undefined") {
            if (typeof triangleCountCallback === "undefined") {
                triangleCountCallback = newProps.onTriangleCountChange;
            }
        }
        if (typeof newProps.onBulletCountChange !== "undefined") {
            if (typeof bulletCountCallback === "undefined") {
                bulletCountCallback = newProps.onBulletCountChange;
            }
        }
        if (typeof newProps.onTriangleUpdateTimeChange !== "undefined") {
            if (typeof triangleUpdateTimeChange === "undefined") {
                bulletCountCallback = newProps.onTriangleTimeChange;
            }
        }
        // HIGHLY EXPERIMENTAL

        if (typeof newProps.onInformationChange !== "undefined") {
            if (typeof informationCallback === "undefined") {
                informationCallback = newProps.onInformationChange;
            }
        }
    };

};

export default triangles;

/*

/**
 *  @version 1.0
 *  @author Paul Wrubel - VoxaelFox
 *
 *  Creates Triangles on a PApplet window supported by processing libraries.
 *
 *  Features include:
 *      Triangles aim at mouse
 *      Triangles can move toward, away from, and orbit the mouse
 *      Trianges can shoot bullets.
 *      Color is based on mouse position (Background) and heading (Triangles/Bullets)
 *      Perspective Movement! (Alpha)
 *
 *  Controls:
 *      RIGHT CLICK:    Create Triangle at cursor
 *                          (can be held in dynamic mode)
 *      LEFT CLICK:     Shoot Bullet from all Triangles on screen at cursor
 *                          (can be held in dynamic mode)
 *      CENTRE CLICK:   Remove oldest Triangle
 *                          (can be held in dynamic mode)
 *
 *      UP ARROW:       Move all Triangles towards cursor (can be held)
 *      DOWN ARROW:     Move all Triangles away from cursor (can be held)
 *      LEFT ARROW:     All Triangles orbit cursor anti-clockwise (can be held)
 *      RIGHT ARROW:    All Triangles orbit cursor clockwise (can be held)
 *
 *      i:              Change perspective up
 *                          (can be held in dynamic mode / blocky in static mode)
 *      k:              Change perspective down
 *                          (can be held in dynamic mode / blocky in static mode)
 *      j:              Change perspective left
 *                          (can be held in dynamic mode / blocky in static mode)
 *      l:              Change perspective right
 *                          (can be held in dynamic mode / blocky in static mode)
 *      u:              Change perspective out
 *                          (can be held in dynamic mode / blocky in static mode)
 *      o:              Change perspective in
 *                          (can be held in dynamic mode / blocky in static mode)
 *
 *      SPACE:          Clears all triangles and bullets from screen
 *
 *      ENTER:          Toggles dynamic / static mode
 *
 *

    float getBorderWeight() {
        return BORDER_WEIGHT;
    }

    float getDecay() {
        return decay;
    }

    /**
     * Getter method for keyCodes
     *
     * @return the keyCodes array
     *

    boolean[] getKeyCodes() {
        return keyCodes;
    }

    /**
     * Is called when a key is pressed down.
     *
     * @param event event linked to which key was pressed
     *



}



*/