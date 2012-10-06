
// pg#634,
// Example 21-4. Regular polygons with moveTo(), lineTo() and closePath()

// Define a regular polygon with n sides, centered at (x,y) with radius r.
// The vertices are equally spaced along the circumference of a circle.
// Put the first vertex straight up or at the specified angle.
// Rotate clockwise, unless the last argument is true.
function polygon(c,n,x,y,r,angle,counterclockwise) {
    angle = angle || 0;
    counterclockwise = counterclockwise || false;
    c.moveTo(x + r*Math.sin(angle),
	     y - r*Math.cos(angle));
    var delta = 2*Math.PI/n;
    for (var i = 1; i < n; i++) {
	angle += counterclockwise?-delta:delta;
	c.lineTo(x + r*Math.sin(angle),
		 y - r*Math.cos(angle));
    }
    c.closePath();
}

function draw_polygon(c) {
    // Start a new path and add polygon subpaths
    c.beginPath();
    polygon(c, 3, 50, 70, 50);
    polygon(c, 4, 150, 60, 50, Math.PI/4);
    polygon(c, 5, 255, 55, 50);
    polygon(c, 6, 365, 53, 50, Math.PI/6);
    polygon(c, 4, 365, 53, 20, Math.PI/4, true);

    // Set some properties that control how the graphics will look like
    c.fillStyle = "#ccc";
    c.strokeStyle = "#008"
    c.lineWidth = 5;

    // Now draw all the polygons (each in its own subpath) with these calls
    c.fill();
    c.stroke();
}
