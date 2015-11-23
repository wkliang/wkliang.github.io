/* Listing 8.7 Reducing the Number of click Event Listeners
 * to a Single Instance Attached to the body Element
 */

var searchAncestorByName = function(node, name) {
	if (node.tagName == name.toUpperCase())
		return node;
	else if (node.parentNode != undefined)
		return searchAncestorByName(node.parentNode, name);
}

var hasClicked = function(e) {
	if (e.target.nodeName == "H1") {
		var ancestor = searchAncestorByName(e.target, "article");
		ancestor.className =
			(ancestor.className == "minimized") ? "" : "minimized";
	}
}

var initialHide = function(sourceElement) {
	sourceElement.className = "minimized";
}

var initEvents = function() {
	var bodyEl = document.getElementsByTagName('body');
	if (bodyEl.length > 0)
		bodyEl.item(0).addEventListener('click', hasClicked, false);

	var selected = document.querySelectorAll('article');
	for (var i = 1; i < selected.length; i++) {
		initialHide(selected.item(i));
	}
}

document.addEventListener('DOMContentLoaded', initEvents, false);
