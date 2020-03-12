class Trail {

	p; // Parent

	x; // x-pos
	y; // y-pos
	r; // current radius

	hue; // color

	angle; // direction of motion
	mag; // magnitude of motion

	isComplete = false; // trail is finished?

	constructor(p_, x_, y_, angle_ = 45, mag_ = 10) {

		this.p = p_;
		this.x = x_;
		this.y = y_;

		this.angle = angle_;
		this.r = this.p.random(25, 150);
		this.hue = this.p.random(360);
		this.mag = mag_;

	}

	draw() {
		this.p.fill(this.hue, 60, 90);
		this.p.ellipse(this.x, this.y, this.r, this.r);
	}

	update() {
		this.hue += 5;
		this.hue %= 360;
		this.r--;
		this.x += this.p.random(this.mag / 2, this.mag) * this.p.sin(this.p.radians(this.angle));
		this.y -= this.p.random(this.mag / 2, this.mag) * this.p.cos(this.p.radians(this.angle));

		this.angle += this.p.random(-5, 5);

		if (this.r <= 0) {
            this.isComplete = true;
        }
	}

}

export default Trail;