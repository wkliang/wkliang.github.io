
// pg#634,
// Example 21-4. Regular polygons with moveTo(), lineTo() and closePath()

// Define a regular polygon with n sides, centered at (x,y) with radius r.
// The vertices are equally spaced along the circumference of a circle.
// Put the first vertex straight up or at the specified angle.
// Rotate clockwise, unless the last argument is true.
function polygon(c,n,x,y,r,angle,counterclockwise) {
    angle = angle || 0;
    counterclockwise = counterclockwise || false;
    console.log(n,0,x+r*Math.sin(angle),y-r*Math.cos(angle));
    c.moveTo(x + r*Math.sin(angle),  // Begin a new subpath at the first vertex
	     y - r*Math.cos(angle)); // Use trigonometry to compute position
    var delta = 2*Math.PI/n;	     // Angular distance between vertices
    for (var i = 1; i < n; i++) {    // For each of remaining vertices
	angle += counterclockwise?-delta:delta;	// Adjust angle
	console.log(n,i,x+r*Math.sin(angle),y-r*Math.cos(angle));
	c.lineTo(x + r*Math.sin(angle),		// Add line to next vertex
		 y - r*Math.cos(angle));
    }
    c.closePath();		// Connect last vertex back to the first
}

function draw_polygon(c) {
    // Start a new path and add polygon subpaths
    c.beginPath();
    polygon(c, 3, 50, 70, 50);			// Triangle
    polygon(c, 4, 150, 60, 50, Math.PI/4);	// Square
    polygon(c, 5, 255, 55, 50);			// Pentagon
    polygon(c, 6, 365, 53, 50, Math.PI/6);	// Hexagon
    polygon(c, 4, 365, 53, 20, Math.PI/4, true); // Small square inside the hexago

    // Set some properties that control how the graphics will look like
    c.fillStyle = "#ccc";	// Light gray interiors
    c.strokeStyle = "#008"	// outlined with dark blue lines
    c.lineWidth = 5;		// five pixels wide

    // Now draw all the polygons (each in its own subpath) with these calls
    c.fill();			// Fill the shapes
    c.stroke();			// And stroke their outlines
}
