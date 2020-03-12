let triangles = (p) => {

    // Required for all sketches
    let updateFrequency = 10;
    let frameRates = [];
    let displayFrameRate;

    let didSetup = false;

    // Gravity Enum replacement
    const GravityMode = {
        OFF: "off",
        SIMPLE: "simple",
        TRUE: "true",
        POINT: "point",
        MULTI_POINT: "multi_point"
    };

    // Initials for this sketch
    let dynamic = false;
    let bounce = false;

    let gravityMode = GravityMode.OFF;
    let decay = 0.99;

    let onControls = true;
    let fixedPoint = null;
    let autoFire = false;

    // let controls = new ControlsBox(p);
    let gravList = [];
    let gravPoint;
    let triangles = [];
    let bulletCount = 0;

    let mouseButtons = [];
    let keys = [];
    let keyCodes = [];

    p.setup = function () {
        let w = p.select(".SketchContainer").width;
        let h = p.select(".SketchContainer").height;
        p.createCanvas(w, h);

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

        p.calculateFrameRate();
        p.updateCallbacks();
    }

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
            // if (typeof frameRateCallback !== "undefined") {
            //     frameRateCallback(displayFrameRate.toFixed(0));
            // }
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
        // if (didSetup) {
        //     if (typeof newProps.mode !== "undefined") {
        // 		if (currentMode !== newProps.mode) {
        //             currentMode = newProps.mode;
        // 		}
        //     }
        // }
        // if (typeof newProps.onFrameRateChange !== "undefined") {
        //     if (typeof frameRateCallback === "undefined") {
        //         frameRateCallback = newProps.onFrameRateChange;
        //     }
        // }
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

public class TriangleManager extends PApplet {


    /**
     * Controls Saturation and Brightness values of screen background
     * Ranges from 0 - 100
     *
    private static final float SAT = 20;
    private static final float BRIGHT = 100;

    /**
     * Stroke weight for the window border and crosshairs
     * Ranges from 0 - INF
     *
    private static final float BORDER_WEIGHT = 12;
    private static final float CROSSHAIRS_WEIGHT = 5;

    /**
     * Limit of the amount of Triangles and Bullets in the window
     * Ranges from 0 - INF
     *
    private static final int TRIANGLE_LIMIT = 500;
    private static final int BULLET_LIMIT = 1500;

    /**
     * Frequency of the creation (and removal) of Triangles and Bullets in dynamic mode
     * 1 writes every frame, 5 every 5 frames, and so on.
     * Lower values are faster
     * Ranges from 1 - INF
     *
    private static final int TRIANGLE_ADD_FREQ = 4;
    private static final int TRIANGLE_REMOVE_FREQ = 4;
    private static final int BULLET_FREQ = 4;

    /**
     * Controls mode of program
     * Dynamic mode:
     * Continuous creation and removal of Triangles and Bullets
     * Smooth and constant movement of window when changing perspective
     * Static mode:
     * Every creation requires a mouse click or key press
     * Perspective movement jumps to preset values and is block-like
     *
    private boolean dynamic;
    private boolean bounce;
    private boolean onControls;
    private boolean autofire;
    private Gravity gravityMode;
    private ArrayList<PVector> gravList;
    private PVector gravPoint;
    private PVector fixedPoint;
    private float decay;
    private ControlsBox controls;

    /**
     * References to all on-screen Triangles
     *
    private ArrayList<Triangle> triangles;
    private int bulletCount;

    /**
     * Arrays to save state of all key and mouse presses concurrently
     * (currently not supported by processing, unfortunately)
     *
    private boolean[] mouseButtons;
    private boolean[] keys;
    private boolean[] keyCodes;

    /**
     * Called once, only to set window size and render method
     * P3D is used to utilize OpenGL's graphics card integration
     * Otherwise there is big lag!
     *
    public void settings() {
        size(WINDOW_WIDTH, WINDOW_HEIGHT, P2D);
        smooth(8);
    }

    /**
     * Called once, for initialization purposes. Nothing is drawn here
     *
    public void setup() {
        frameRate(60);

        //  Initial values
        dynamic = false;
        bounce = false;
        gravityMode = Gravity.OFF;
        decay = 0.99f;
        onControls = true;
        fixedPoint = null;
        autofire = false;

        controls = new ControlsBox(this);
        gravList = new ArrayList<>();
        gravPoint = new PVector(width / 2, height / 2);
        triangles = new ArrayList<>();
        bulletCount = 0;
        mouseButtons = new boolean[40];
        keys = new boolean[128];
        keyCodes = new boolean[41];

        //  Can resize window (alpha)
        surface.setResizable(true);
        surface.setLocation((displayWidth - width) / 2, (displayHeight - height) / 2 - 50);

        //  Hue, Saturation, Brightness, and ranges
        colorMode(HSB, 360, 100, 100, 100);
        //  Ellipses are drawn from centre and distances are radii
        ellipseMode(RADIUS);
        //  Background begins black
        background(color(0, 0, 0));
        //  To avoid rendering artifacts from 3D mode
        //  Essentially tells renderer to just ignore z-dimension
    }

    /**
     * Called once every frame.
     * All drawing to window buffer occurs here, either directly or indirectly (from supporting classes called)
     *
    public void draw() {

        //  Set window title based on current mode
        if (dynamic) {
            surface.setTitle("Triangles - Dynamic");
        } else {
            surface.setTitle("Triangles - Static");
        }

        //  Set hue based on horizontal mouse position
        float hue = map(mouseX, 0, width, 0, 360);
        background(hue, SAT, BRIGHT, 100);

        //  Draw border around effective "window", if bounce is set
        //  to show the bouncing "walls"
        if (bounce) {
            fill(color(0, 0, 0));
            noStroke();
            rectMode(CORNER);
            //  Top Border
            rect(0, 0, width, BORDER_WEIGHT);
            //  Left Border
            rect(0, 0, BORDER_WEIGHT, height);
            //  Bottom Border
            rect(0, height - BORDER_WEIGHT, width, BORDER_WEIGHT);
            //  Right Border
            rect(width - BORDER_WEIGHT, 0, BORDER_WEIGHT, height);
        }

        //  Draw red border signifying outer bullet perimeter
        //  and frame border
        fill(color(0, 100, 100));
        noStroke();
        rectMode(CORNER);
        //  Top Border
        rect(0 - BORDER_WEIGHT, 0 - BORDER_WEIGHT, width + BORDER_WEIGHT * 2, BORDER_WEIGHT);
        //  Left Border
        rect(0 - BORDER_WEIGHT, 0 - BORDER_WEIGHT, BORDER_WEIGHT, height + BORDER_WEIGHT * 2);
        //  Bottom Border
        rect(0 - BORDER_WEIGHT, height, width + BORDER_WEIGHT * 2, BORDER_WEIGHT);
        //  Right Border
        rect(width, 0 - BORDER_WEIGHT, BORDER_WEIGHT, height + BORDER_WEIGHT * 2);

        stroke(color(0, 0, 0));
        if (gravityMode == Gravity.POINT) {
            //  Draw Gravity Point
            stroke(color(0, 0, 0));
            strokeWeight(2);
            fill(color(0, 0, 100));
            ellipse(gravPoint.x, gravPoint.y, 4, 4);
        } else if (gravityMode == Gravity.MULTI_POINT) {
            stroke(color(0, 0, 0));
            strokeWeight(2);
            fill(color(0, 0, 100));
            for (PVector v : gravList) {
                ellipse(v.x, v.y, 4, 4);
            }
        }

        //  Draw crosshairs
        if (!onControls) {
            stroke(color(0, 100, 100));
            strokeWeight(CROSSHAIRS_WEIGHT);
            line(mouseX, mouseY - 10, mouseX, mouseY + 10);
            line(mouseX - 10, mouseY, mouseX + 10, mouseY);
        }

        //  Initial values for timing vars
        double triangleTime;
        double bulletUpdateTime ;
        double bulletDrawTime;
        long start;
        long end;

        bulletCount = 0;

        start = System.nanoTime();
        for (Triangle t : triangles) {

            for (Bullet b : t.bullets()) {

                b.update();
                //b.draw();

            }
        }
        end = System.nanoTime();
        bulletUpdateTime = (end - start) / 1000000d / triangles.size();

        start = System.nanoTime();
        for (Triangle t : triangles) {

            for (Bullet b : t.bullets()) {

                //b.update();
                b.draw();

            }

        }
        end = System.nanoTime();
        bulletDrawTime = (end - start) / 1000000d / triangles.size();

        start = System.nanoTime();
        for (Triangle t : triangles) {

            t.update();
            t.draw();

            bulletCount += t.bullets().size();
        }
        end = System.nanoTime();
        triangleTime = (end - start) / 1000000d / triangles.size();

        //  Only if in dynamic mode
        //  Check for mouse buttons and key presses and perform actions accordingly
        if (dynamic) {
            //  Add Triangles
            if (mouseButtons[RIGHT] && frameCount % TRIANGLE_ADD_FREQ == 0) {
                handleAdd();
            }
            //  Remove Triangles
            if (keys[(int) BACKSPACE] && (frameCount % TRIANGLE_REMOVE_FREQ) == 0) {
                if (triangles.size() != 0) {
                    triangles.remove(0);
                }
            }
            //  Add Bullets
            if ((mouseButtons[LEFT] || autofire) && (frameCount % BULLET_FREQ) == 0) {
                for (Triangle t : triangles) {
                    if (bulletCount < BULLET_LIMIT) {
                        t.addBullet();
                    }
                }
            }
        }

        //  Print basic debug text to screen
        //  Text is written to top left corner of window
        if (!onControls) {
            textSize(12);
            fill(0);
            textMode(SHAPE);
            textAlign(LEFT);

            float yLoc = 50;
            text("X: " + mouseX, 50, yLoc);
            yLoc += 20;
            text("Y: " + mouseY, 50, yLoc);
            yLoc += 20;
            text("Triangle Count: " + triangles.size(), 50, yLoc);
            yLoc += 20;
            text("Bullet Count: " + bulletCount, 50, yLoc);
            yLoc += 20;
            String triangleText = String.format("Triangle Time: ~%.4fms", triangleTime);
            String bulletUpdateText = String.format("Bullet Update Time: ~%.4fms", bulletUpdateTime);
            String bulletDrawText = String.format("Bullet Draw Time: ~%.4fms", bulletDrawTime);
            String FPSText = String.format("FPS: %d", (int) frameRate);
            text(triangleText, 50, yLoc);
            yLoc += 20;
            text(bulletUpdateText, 50, yLoc);
            yLoc += 20;
            text(bulletDrawText, 50, yLoc);
            yLoc += 20;
            text(FPSText, 50, yLoc);
            yLoc += 20;
            if (bounce) {
                text("Bounce: ON", 50, yLoc);
            } else {
                text("Bounce: OFF", 50, yLoc);
            }
            yLoc += 20;
            if (gravityMode == Gravity.OFF) {
                text("Decay: OFF", 50, yLoc);
            } else {
                text("Decay: " + decay, 50, yLoc);
            }
            yLoc += 20;
            text("Gravity Mode: " + gravityMode, 50, yLoc);

        }

        if (onControls) {
            controls.update();
            controls.draw();
        }
    }

    /**
     * Handles adding of Triangles to screen
     * Will erase oldest if over TRIANGLE_LIMIT already on screen
     *
    private void handleAdd() {
        if (triangles.size() != 0) {
            //  Make sure the mouse is in a different position
            if (mouseX != triangles.get(triangles.size() - 1).getPos().x || mouseY != triangles.get(triangles.size() - 1).getPos().y) {
                triangles.add(new Triangle(this, new PVector(mouseX, mouseY)));
                //  Remove oldest
                if (triangles.size() > TRIANGLE_LIMIT) {
                    triangles.remove(0);
                }
            }
        } else {
            //  If brand-new, just add one!
            triangles.add(new Triangle(this, new PVector(mouseX, mouseY)));
        }
    }

    boolean getBounceMode() {
        return bounce;
    }

    Gravity getGravityMode() {
        return gravityMode;
    }

    PVector getGravityPoint() {
        if (gravityMode == Gravity.SIMPLE || gravityMode == Gravity.TRUE) {
            return new PVector(mouseX, mouseY);
        } else {
            return gravPoint;
        }
    }

    ArrayList<PVector> getGravityList() {
        return gravList;
    }

    float getBorderWeight() {
        return BORDER_WEIGHT;
    }

    float getDecay() {
        return decay;
    }

    PVector getAimPoint() {
        if (fixedPoint != null) {
            return fixedPoint;
        } else {
            return new PVector(mouseX, mouseY);
        }
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

    public void keyPressed(KeyEvent event) {
        if (onControls) {
            return;
        }

        //  Get key data
        char k = event.getKey();
        int kc = event.getKeyCode();

        if (k < keys.length) {
            keys[k] = true;
        } else {
            keyCodes[kc] = true;
        }

        // Handle key data
        if (k == ENTER) {
            dynamic = !dynamic;
        }
        if (k == 'f') {
            if (fixedPoint != null) {
                fixedPoint = null;
            } else {
                fixedPoint = new PVector(mouseX, mouseY);
            }
        }
        if (k == 'a') {
            autofire = !autofire;
        }
        if (k == 'h') {
            onControls = true;
        }
        if (k == ' ') {
            triangles.clear();
        }
        if (k == 'b') {
            bounce = !bounce;
        }
        if (k == 'c') {
            for (Triangle t : triangles) {
                t.clearBullets();
            }
        }
        if (k == 'g') {
            if (gravityMode == Gravity.POINT) {
                gravPoint = new PVector(mouseX, mouseY);
            } else if (gravityMode == Gravity.MULTI_POINT) {
                gravList.add(new PVector(mouseX, mouseY));
            }
        }
        if (k == 'r') {
            if (gravityMode == Gravity.POINT) {
                gravPoint = new PVector(width / 2, height / 2);
            } else if (gravityMode == Gravity.MULTI_POINT) {
                gravList.clear();
            }
        }
        if (k == '1') {
            gravityMode = Gravity.OFF;
        }
        if (k == '2') {
            gravityMode = Gravity.SIMPLE;
        }
        if (k == '3') {
            gravityMode = Gravity.TRUE;
        }
        if (k == '4') {
            gravityMode = Gravity.POINT;
        }
        if (k == '5') {
            gravityMode = Gravity.MULTI_POINT;
        }
        if (!dynamic) {
            if (k == BACKSPACE) {
                if (triangles.size() != 0) {
                    triangles.remove(0);
                }
            }
        }
    }

    /**
     * Is called once when a key is released
     *
     * @param event event holding data about the released key
     *
    public void keyReleased(KeyEvent event) {
        char k = event.getKey();
        int kc = event.getKeyCode();

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
     *

    public void mousePressed(MouseEvent event) {
        int mb = event.getButton();

        if (onControls) {
            onControls = false;
            return;
        }

        //  Set array position to true
        mouseButtons[mb] = true;

        if (mb == CENTER) {

        }

        //  Handle mouse button actions
        if (!dynamic) {
            if (mb == LEFT) {
                for (Triangle t : triangles) {
                    if (bulletCount < BULLET_LIMIT) {
                        t.addBullet();
                    }
                }
            }
            if (mb == RIGHT) {
                handleAdd();
            }
        }
    }

    /**
     * Is called once when a mouse button is released
     *
     * @param event event containing data about the mouse button released
     *

    public void mouseReleased(MouseEvent event) {
        int mb = event.getButton();

        //  Simply set position to false
        mouseButtons[mb] = false;
    }

}



*/