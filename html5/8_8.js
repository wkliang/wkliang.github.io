/* Listing 8.8 Reducing the Number of Global Variables 
 * to a Single Container Object
 */
"use strict";

var myModule = Object.create({

    searchAncestorByName : function(node, name) {
	if (node.tagName == name.toUpperCase())
		return node;
	else if (node.parentNode != undefined)
		return myModule.searchAncestorByName(node.parentNode, name);
    },

    hasClicked : function(e) {
	if (e.target.nodeName == "H1") {
		var ancestor = myModule.searchAncestorByName(e.target, "article");
		ancestor.className =
			(ancestor.className == "minimized") ? "" : "minimized";
	}
    },

    initialHide : function(sourceElement) {
	sourceElement.className = "minimized";
    },

    initEvents : function() {
	var bodyEl = document.getElementsByTagName('body');
	if (bodyEl.length > 0)
		bodyEl.item(0).addEventListener('click', myModule.hasClicked, false);

	var selected = document.querySelectorAll('article');
	for (var i = 1; i < selected.length; i++) {
		myModule.initialHide(selected.item(i));
	}
    }
});

document.addEventListener('DOMContentLoaded', myModule.initEvents, false);
