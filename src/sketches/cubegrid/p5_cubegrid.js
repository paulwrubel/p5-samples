let cubegrid = (p) => {

    let numW = 6;         // Number of Rows
    let numH = 6;         // Number of Columns
    let numD = 6;         // Number of Layers

    let dist = -1600;      // Initial Camera distance
    let deltaDist = 0;    // Change in camera distance
    let length = 50;      // Length of the side of a cube
    let offset = 150;     // Distance between the cubes
    let deltaOffset = 0; // Change in distance between cubes

    let xState = 0;       // Used to save rotations for mouse rotations. Best to not
    // change.
    let yState = 0;       //

    let angleX = 0;       // Saves x-angle for rotations, can be used to angle cube
    // perspective initially
    let dAngleX = 0.5;   // Change in x rotation.

    let angleY = 0;       // Same as above for y-angle
    let dAngleY = 0;     //

    let angleZ = 0;       // Same as above for z-angle
    let dAngleZ = 0.5;   //

    let colors = [];   // Hold all cubes colors.

    p.setup = function () {
        let w = p.select(".SketchContainer").width;// - p.select(".Sidebar").width;
        let h = p.select(".SketchContainer").height;
        p.createCanvas(w, h, p.WEBGL);

        p.smooth(8);
        p.colorMode(p.HSB, 360, 100, 100);
        p.setupColors();
    };

    p.draw = function () {
        p.background(0);

        // Moves origin to centre of
        // window and back the specified
        // distance
        p.translate(p.width / 2, p.height / 2, dist); 
        dist += deltaDist;
        offset += deltaOffset;

        // if (mousePressed && mouseButton == LEFT) {
        //     yState += pmouseY - mouseY;
        //     xState += mouseX - pmouseX;
        // }

        // checkKeys();
        p.rotateX(p.radians(yState));
        p.rotateY(p.radians(xState));

        angleX += dAngleX;
        angleY += dAngleY;
        angleZ += dAngleZ;
        p.rotateX(p.radians(angleX));
        p.rotateY(p.radians(angleY));
        p.rotateZ(p.radians(angleZ));

        p.translate(-(((numW - 1) / 2) * (length + offset)), 0, 0);
        p.translate(0, -(((numH - 1) / 2) * (length + offset)), 0);
        p.translate(0, 0, -(((numD - 1) / 2) * (length + offset)));
        for (let z = 0; z < numD; z++) {
            for (let y = 0; y < numH; y++) {
                for (let x = 0; x < numW; x++) {
                    p.fill(colors[x][y][z][0], colors[x][y][z][1], colors[x][y][z][2]);
                    p.box(length); // Draws a Cube to the surface
                    p.translate(length + offset, 0, 0); // Moves matrix to the
                    // right for next box
                }
                p.translate(-(numW * (length + offset)), 0, 0); // Moves matrix
                // back to start
                // of row
                p.translate(0, length + offset, 0); // Moves matrix down to next
                // row
            }
            p.translate(0, -(numH * (length + offset)), 0); // Moves matrix back
            // to start of
            // column
            p.translate(0, 0, length + offset); // Moves matrix down to next layer
        }

    };

    p.setupColors = function () {
        colors = [];

        for (let i = 0; i < numW; i++) {
            colors[i] = [];
            for (let j = 0; j < numH; j++) {
                colors[i][j] = []
                for (let k = 0; k < numD; k++) {
                    colors[i][j][k] = [];
                    colors[i][j][k][0] = p.map(p.random(), 0, 1, 0, 360);
                    colors[i][j][k][1] = p.map(p.random(), 0, 1, 30, 100);
                    colors[i][j][k][2] = p.map(p.random(), 0, 1, 50, 100);
                }
            }
        }
    };

};

export default cubegrid;

/*

package me.paul.cube;

import javafx.scene.paint.Color;
import processing.core.PApplet;
import processing.event.MouseEvent;

/**
 *
 * @author Paul Wrubel
 *
 *         This is dangerous and extremely slow unless your java build is
 *         running off a powerful GPU.
 *
 *         Renders cubes in 3D.
 *
 *         Using 1/2 on number row decreases/increases rows (x). Using 3/4 on
 *         number row decreases/increases columns (y). Using 5/6 on number row
 *         decreases/increases layers (z).
 *
 *         There is a lot of customizability with this program. The default
 *         setup is one of many many configurations, and is designed to provide
 *         a demonstration of the most features.
 *
 *         Click-dragging the mouse rotates the cubes. Scrolling zooms.
 *
 *

public class Cube extends PApplet {

	public void settings() {
		size(1600, 800, P3D);
		smooth(8);
	}

	public void setup() {
		// ortho();
		colorMode(HSB, 360, 100, 100);
		surface.setResizable(true);
		setupColors();
	}

	public void draw() {
		background(360);

		translate(width / 2, height / 2, dist); // Moves origin to centre of
												// window and back the specified
												// distance
		dist += deltaDist;
		offset += deltaOffset;

		if (mousePressed && mouseButton == LEFT) {
			yState += pmouseY - mouseY;
			xState += mouseX - pmouseX;
		}

		checkKeys();
		rotateX(radians(yState));
		rotateY(radians(xState));

		angleX += dAngleX;
		angleY += dAngleY;
		angleZ += dAngleZ;
		rotateX(radians(angleX));
		rotateY(radians(angleY));
		rotateZ(radians(angleZ));

		translate(-(((numW - 1) / 2) * (length + offset)), 0, 0);
		translate(0, -(((numH - 1) / 2) * (length + offset)), 0);
		translate(0, 0, -(((numD - 1) / 2) * (length + offset)));
		for (int z = 0; z < numD; z++) {
			for (int y = 0; y < numH; y++) {
				for (int x = 0; x < numW; x++) {
					fill(colors[x][y][z][0], colors[x][y][z][1], colors[x][y][z][2]);
					box(length); // Draws a Cube to the surface
					translate(length + offset, 0, 0); // Moves matrix to the
														// right for next box
				}
				translate(-(numW * (length + offset)), 0, 0); // Moves matrix
																// back to start
																// of row
				translate(0, length + offset, 0); // Moves matrix down to next
													// row
			}
			translate(0, -(numH * (length + offset)), 0); // Moves matrix back
															// to start of
															// column
			translate(0, 0, length + offset); // Moves matrix down to next layer
		}

	}

	private void checkKeys() {
		if (keyPressed) {
			if (key == '1') {
				numW--;
				if (numW < 1)
					numW = 1;
			}
			if (key == '2') {
				numW++;
				if (numW < 1)
					numW = 1;
			}
			if (key == '3') {
				numH--;
				if (numH < 1)
					numH = 1;
			}
			if (key == '4') {
				numH++;
				if (numH < 1)
					numH = 1;
			}
			if (key == '5') {
				numD--;
				if (numD < 1)
					numD = 1;
			}
			if (key == '6') {
				numD++;
				if (numD < 1)
					numD = 1;
			}
			setupColors();
		}
	}

	public void mouseWheel(MouseEvent event) {
		float e = event.getCount();
		dist += -e * 10;
	}

	private void background(Color color) {
		background((float) color.getHue(), (float) color.getSaturation() * 100, (float) color.getBrightness() * 100);
	}

	private void fill(Color color) {
		fill((float) color.getHue(), (float) color.getSaturation() * 100, (float) color.getBrightness() * 100);
	}

	public static void main(String _args[]) {
		PApplet.main(new String[] { me.paul.cube.Cube.class.getName() });
	}
}

*/