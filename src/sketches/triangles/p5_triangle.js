import p5 from "p5";
import Bullet from "./p5_bullet";

class Triangle {

    /**
     * Default values for Saturation, Brightness
     * Of triangles
     */
    SAT = 85;
    BRIGHT = 100;

    /**
     * Stroke weight default
     * And Magnitude of movement with arrow keys
     */
    STROKE_WEIGHT = 5;
    MAG = 4;

    /**
     * A reference to a Triangles Object
     * Needed to draw to the buffer from PApplet
     */
    p;

    /**
     * Location and heading of triangles on window
     */
    pos;
    aimPoint;
    velocity;

    /**
     * bullet list, along with a copy list to remove off-screen bullets
     */
    bullets;
    bulletsToRemove;

    /**
     * Shape for triangle geometry
     */
    tri;

    constructor(p_, pos_) {

        this.p = p_;
        this.pos = pos_;
        this.aimPoint = this.p.createVector(this.p.mouseX, this.p.mouseY);
        this.velocity = this.p.createVector(0, -1).mult(this.MAG);

        //  Initialization
        this.bullets = [];
        this.bulletsToRemove = [];

        // Create framework for triangle geometry
    }

    /**
     * Updates Triangle data, such as
     * location, heading, color, and bullet list
     */
    update() {

        this.aimPoint = this.p.getAimPoint();

        //  Perform trigonometric operation to get new location from heading
        //  Applicable if keys are pressed
        if (this.pos.dist(this.aimPoint) > this.velocity.mag()/2) {

            if (this.p.getKeyCodes()[this.p.LEFT]) {
                this.pos.add(this.velocity.copy().rotate(-this.p.acos(this.velocity.mag() / (2 * p5.Vector.dist(this.pos, this.aimPoint)))));
            }
            if (this.p.getKeyCodes()[this.p.RIGHT]) {
                this.pos.add(this.velocity.copy().rotate(this.p.acos(this.velocity.mag() / (2 * p5.Vector.dist(this.pos, this.aimPoint)))));
            }
            if (this.p.getKeyCodes()[this.p.UP]) {
                this.pos.add(this.velocity);
            }
            if (this.p.getKeyCodes()[this.p.DOWN]) {
                this.pos.sub(this.velocity);
            }

            if (this.pos.dist(this.aimPoint) > 0) {
                this.velocity.set(p5.Vector.sub(this.aimPoint, this.pos).normalize().mult(this.MAG));
            } else {
                this.velocity.set(0, -1).mult(this.MAG);
            }
        } else {
            this.velocity.set(0, -1).mult(this.MAG);
        }

        //  Add off-screen bullets to the remove copy list
        this.bullets.forEach(bullet => {
            if (bullet.markedForDelete) {
                this.bulletsToRemove.push(bullet);
            }
        });

        // Remove bullets from main list and clear copy list
        this.bullets = this.bullets.filter(bullet => !this.bulletsToRemove.includes(bullet));
        this.bulletsToRemove = [];
    }

    /**
     * Draws a Triangle to the screen
     */
    draw() {

        // Set color and drawing properties
        let hue = 180 + this.p.degrees(this.velocity.copy().rotate(this.p.radians(-90)).heading());
        this.p.fill(this.p.color(hue, this.SAT, this.BRIGHT));
        this.p.stroke(this.p.color(0, 0, 0));
        this.p.strokeWeight(this.STROKE_WEIGHT);

        // Move origin to our location and rotate so up is our heading
        this.p.translate(this.pos.x, this.pos.y);
        this.p.rotate(this.velocity.copy().rotate(this.p.radians(90)).heading());

        // Draw our preset geometry to screen
        this.p.triangle(0, -45, -30, 36, 30, 36);

        // Un-rotate and move origin back to reset
        this.p.rotate(-this.velocity.copy().rotate(this.p.radians(90)).heading());
        this.p.translate(-this.pos.x, -this.pos.y);
    }

    /**
     * Adds a bullet to this Triangle's bullet list
     */
    addBullet() {
        //  Calculate starting locations
        let bulletPos = this.pos.copy().add(this.velocity.copy().mult(10));

        //  Add to list
        this.bullets.push(new Bullet(this.p, bulletPos, this.velocity.copy().normalize(), this.p.getBounceMode()));
    }
};

export default Triangle;
