import p5 from "p5";
import GravityMode from "./p5_gravitymode";

class Bullet {

    /**
     * Defaults for drawing properties
     * such as if the bullet is filled with color or hollow, and
     * stroke weight, radius, and magnitude of movement
     * <p>
     * Also defaults for Saturation and Brightness values
     */
    FILL = true;
    STROKE = true;
    STROKE_WEIGHT = 2;
    RADIUS = 10;

    MAG = 8;
    GRAVITY_CONST = 10000;

    BRIGHT = 85;

    /**
     * Reference to a Triangles object to draw to
     */
    p;
    markedForDelete;
    bounce;
    gravity;

    /**
     * Location and heading of this Bullet
     */
    pos;
    velocity;
    acceleration;

    circ;

    /**
     * Constructor for a Bullet object
     *
     * @param p_  Reference to a PApplet class to draw to
     * @param pos_      PVector describing position of this Bullet
     * @param velocity_ heading (in radians) of this Bullet
     */

    constructor(p_, pos_, velocity_, bounce_) {
        this.p = p_;
        this.pos = pos_;
        this.velocity = velocity_.mult(this.MAG);
        this.acceleration = this.p.createVector(0, 0);

        this.markedForDelete = false;
        this.bounce = bounce_;

        this.gravity = 1;
    }

    /**
     * Updates information and properties about this Bullet object
     * like it's location and color
     */
    update() {

        this.bounce = this.p.getBounceMode();
        let gm = this.p.getGravityMode();

        if (gm === GravityMode.OFF) {

            this.acceleration.set(0, 0);

        } else if (gm === GravityMode.SIMPLE) {
            let gravityPoint = this.p.getGravityPoint();
            this.gravity = 1;

            this.acceleration.set(p5.Vector.sub(gravityPoint, this.pos).setMag(this.gravity));

        } else if (gm === GravityMode.MULTI_POINT) {
            let gravForces = [];

            this.p.getGravityList().forEach(gravityVector => {
                let gravDist = this.pos.dist(gravityVector);

                if (gravDist > this.p.sqrt(this.GRAVITY_CONST)) {
                    this.gravity = this.GRAVITY_CONST / this.p.sq(this.gravDist);
                } else {
                    this.gravity = 1;
                }

                gravForces.push(p5.Vector.sub(gravityVector, this.pos).setMag(this.gravity));
            });

            this.acceleration.set(0, 0);

            gravForces.forEach(forceVector => {
                this.acceleration.add(forceVector);
            });
        } else {
            let gravityPoint = this.p.getGravityPoint();
            let gravDist = this.pos.dist(gravityPoint);

            if (gravDist > this.p.sqrt(this.GRAVITY_CONST)) {
                this.gravity = this.GRAVITY_CONST / this.p.sq(gravDist);
            } else {
                this.gravity = 1;
            }

            this.acceleration.set(p5.Vector.sub(gravityPoint, this.pos).setMag(this.gravity));
        }

        this.velocity.add(this.acceleration);

        if (this.p.getGravityMode() !== GravityMode.OFF) {
            this.velocity.mult(this.p.getDecay());
        }

        //  Update location based on heading

        this.pos.add(this.velocity);

        if (this.bounce) {
            if (this.pos.x < 0 + this.RADIUS + this.p.getBorderWeight()) {
                this.velocity.x *= -1;
                this.pos.x = 0 + this.RADIUS + this.p.getBorderWeight();
            } else if (this.pos.x > this.p.width - this.RADIUS - this.p.getBorderWeight()) {
                this.velocity.x *= -1;
                this.pos.x = this.p.width - this.RADIUS - this.p.getBorderWeight();
            }
            if (this.pos.y < 0 + this.RADIUS + this.p.getBorderWeight()) {
                this.velocity.y *= -1;
                this.pos.y = 0 + this.RADIUS + this.p.getBorderWeight();
            } else if (this.pos.y > this.p.height - this.RADIUS - this.p.getBorderWeight()) {
                this.velocity.y *= -1;
                this.pos.y = this.p.height - this.RADIUS - this.p.getBorderWeight();
            }
        } else {
            if (this.pos.x < 0 - this.RADIUS) {
                this.markedForDelete = true;
            } else if (this.pos.x > this.p.width + this.RADIUS) {
                this.markedForDelete = true;
            }
            if (this.pos.y < 0 - this.RADIUS) {
                this.markedForDelete = true;
            } else if (this.pos.y > this.p.height + this.RADIUS) {
                this.markedForDelete = true;
            }
        }
    }

    /**
     * Draws this Bullet object to the screen
     */
    draw() {
        // Decide of color for Bullet, or if hollow
        if (this.STROKE) {
            this.p.strokeWeight(this.STROKE_WEIGHT);
            this.p.stroke(this.p.color(0, 0, 0));
        } else {
            this.p.noStroke();
        }

        if (this.FILL) {
            let hue = 180 + this.p.degrees(this.velocity.copy().rotate(this.p.radians(-90)).heading());
            // let hue = 90 + this.p.degrees(this.velocity.heading());
            let sat = this.p.sqrt(this.p.map(this.velocity.mag(), 0, 50, 10, 10000));
            // let sat = this.p.map(this.velocity.mag(), 0, 50, 1, 100);
            this.p.fill(this.p.color(hue, sat, this.BRIGHT));
        } else {
            this.p.noFill();
        }
        //  No need for rotation as we are simple drawing a circle
        this.p.ellipse(this.pos.x, this.pos.y, this.RADIUS, this.RADIUS);

    };

};

export default Bullet;
