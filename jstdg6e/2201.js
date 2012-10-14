
// pg#669, Example 22-1. Using geolocation to display a map

// Return a newly created <img> element that will (once geolocation succeeds)
// be set to display a Google map of the current location. Note that the caller
// must insert the returned element into the document in order to make it
// visible. Throw an error if geolocation is not supported in the browser
function getmap() {
    // Check for geolocation support
    if (!navigator.geolocation) throw "Geolocation not supported";

    // Create a new <img> element, start a geolocation request to make the img
    // display a map of where we are, and then return the image.
    var image = document.createElement("img");
    navigator.geolocation.getCurrentPosition(setMapURL);
    return image;

    // This function will be invoked after we return the image object, when
    // (and if) the geolocation request succeeds.
    function setMapURL(pos) {
	// Get our position information fromthe argument object
	var latitude = pos.coords.latitude;	// Degrees N of equator
	var longitude = pos.coords.longitude;	// Degrees E of Greenwich
	var accuracy = pos.coords.accuracy;	// Meters

	// Construct a URL for a static Google map image of this location
	var url = "http://maps.googleapis.com/maps/api/staticmap" +
		"?center=" + latitude + "," + longitude +
		"&size=640x640&sensor=true";

	// Set the map zoom level using a rough heuristic
	var zoomlevel = 20;	// Start zoomed in almost all the way
	if (accuracy > 80)	// Zoom out for less accurate positions
	    zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
	url += "&zoom=" + zoomlevel;	// Add zoom level to the URL

	console.log(url);

	// Now display the map in the image object. Thanks, Google!
	image.src = url;
    }
}

