
var searchAncestorByName = function(node, name) {
	if (node.tagName == name.toUpperCase())
		return node;
	else if (node.parentNode != undefined)
		return searchAncestorByName(node.parentNode, name);
}

var hasClicked = function(e) {
	var ancestor = searchAncestorByName(e.target, "article");
	ancestor.className =
		(ancestor.className == "minimized") ? "" : "minimized";
}

var initialHide = function(sourceElement) {
	var ancestor = searchAncestorByName(sourceElement, "article");
	ancestor.className = "minimized";
}

var initEvents = function() {
	var selected = document.querySelectorAll('article h1');
	for (var i = 0; i < selected.length; i++) {
		selected.item(i).addEventListener('click', hasClicked, false);
		if (i > 0)
			initialHide(selected.item(i));
	}
}

document.addEventListener('DOMContentLoaded', initEvents, false);
