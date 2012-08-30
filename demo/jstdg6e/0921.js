
// pg#241
// Example 9-21. A Range class with strongly encapsulated endpoints
// This version of the Range class is mutable but encapsulates its endpoint
// variables to maintain the invariant that from <= to.
function Range(from, to) {
    // Verify that the invariant that from <= to.
    if (from > to) throw new Error("Range: from must be <= to");

    // Define the accessor methods that maintain the invariant
    function getFrom() { return from; }
    function getTo() { return to; }
    function setFrom(f) {	// Don't allow from to be set > to
	if (f <= to) from = f;
	else throw new Error("Range: from must be <= to");
    }
    function setTo(t) {	// Don't allow to to be set < from
	if (t >= from) to = t;
	else throw new Error("Range: to must be >= from");
    }

    // Create enumerable, nonconfigurable properties that use the accessors
    Object.defineProperties(this, {
	from: {get: getFrom, set: setFrom, enumerable:true, configurable:false},
	to: {get: getTo, set: setTo, enumerable:true, configurable:false}
    });
}
