class ControlsBox {

    BORDER_WEIGHT = 20;
    LINE_WEIGHT = 1;
    PADDING = 100;

    p;

    topLeft;
    top;
    topRight;
    centerLeft;
    center;
    centerRight;
    bottomLeft;
    center;
    bottomRight;

    constructor(p_) {
        this.p = p_;

        this.topLeft = this.p.createVector(this.PADDING, this.PADDING);
        this.top = this.p.createVector(this.p.width / 2, this.PADDING);
        this.topRight = this.p.createVector(this.p.width - this.PADDING, this.PADDING);
        this.centerLeft = this.p.createVector(this.PADDING, this.p.height / 2);
        this.center = this.p.createVector(this.p.width / 2, this.p.height / 2);
        this.centerRight = this.p.createVector(this.p.width - this.PADDING, this.p.height / 2);
        this.bottomLeft = this.p.createVector(this.PADDING, this.p.height - this.PADDING);
        this.bottom = this.p.createVector(this.p.width / 2, this.p.height - this.PADDING);
        this.bottomRight = this.p.createVector(this.p.width - this.PADDING, this.p.height - this.PADDING);

    }

    update() {
        this.topLeft = this.p.createVector(this.PADDING, this.PADDING);
        this.top = this.p.createVector(this.p.width / 2, this.PADDING);
        this.topRight = this.p.createVector(this.p.width - this.PADDING, this.PADDING);
        this.centerLeft = this.p.createVector(this.PADDING, this.p.height / 2);
        this.center = this.p.createVector(this.p.width / 2, this.p.height / 2);
        this.centerRight = this.p.createVector(this.p.width - this.PADDING, this.p.height / 2);
        this.bottomLeft = this.p.createVector(this.PADDING, this.p.height - this.PADDING);
        this.bottom = this.p.createVector(this.p.width / 2, this.p.height - this.PADDING);
        this.bottomRight = this.p.createVector(this.p.width - this.PADDING, this.p.height - this.PADDING);
    }

    // TODO: Finish drawing
    draw() {
        this.p.rectMode(this.p.CORNERS);
        this.p.strokeWeight(this.BORDER_WEIGHT);
        this.p.fill(this.p.color(0, 0, 100));
        this.p.rect(this.topLeft.x, this.topLeft.y, this.bottomRight.x, this.bottomRight.y, 1.0);

        this.p.fill(0);
        // this.p.textMode(this.p.SHAPE);

        this.p.textAlign(this.p.center, this.p.TOP);
        this.p.textSize(100);
        this.p.text("CONTROLS / HELP", this.top.x, this.top.y);

        this.p.strokeWeight(this.LINE_WEIGHT);
        this.p.line(this.topLeft.x + 200, this.topLeft.y + 110, this.topRight.x - 200, this.topRight.y + 110);

        let xLoc = this.topLeft.x + 15;
        let yLoc = this.topLeft.y + 150;
        let textSize = 25;
        this.p.textSize(textSize);
        this.p.textAlign(this.p.LEFT);
        this.p.text("Right Click:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Left Click:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("this.center Click:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Up Arrow:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Down Arrow:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Left Arrow:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Right Arrow:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Space:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("Enter / Return:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("h:", xLoc, yLoc);
        xLoc = this.topLeft.x + 500;
        yLoc = this.topLeft.y + 150;

        this.p.text("i:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("k:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("j:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("l:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("u:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("o:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("r:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("c:", xLoc, yLoc);
        yLoc += textSize + 10;
        this.p.text("b:", xLoc, yLoc);
        yLoc += textSize + 10;
    }
}

export default ControlsBox;