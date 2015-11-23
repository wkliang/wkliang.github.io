/* Listing 9.2
 * Interacting with the Server Using XML
 */
"use strict";

var myModule = Object.create({

    ajaxHandler : function(e) {
	if (this.readyState == 4 && this.status == 200) {
	    console.log(this);
	    var res = this.responseXML;
	    var name = res.getElementsByTagName('name');
	    var description = res.getElementsByTagName('description');
	    var lastChange = res.getElementsByTagName('lastChange');
	    var newText = name.item(0).firstChild.nodeValue + ' ' +
		description.item(0).firstChild.nodeValue + ' ' +
		lastChange.item(0).firstChild.nodeValue + ' ';
	    var selected = document.querySelectorAll('p#replace');
	    selected.item(0).firstChild.nodeValue = newText;
	} else if (this.readyState == 4 && this.status != 200) {
            // error handling
	} else {
	    // error handling
	}
    },

    searchAncestorByName : function(node, name) {
	if (node.tagName == name.toUpperCase())
	    return node;
	else if (node.parentNode != undefined)
	    return myModule.searchAncestorByName(node.parentNode, name);
    },

    hasClicked : function(e) {
	// console.log(e.target.nodeName + " clicked: " + e.target.innerHTML);
	if (e.target.nodeName == "H1") {
	    var ancestor = myModule.searchAncestorByName(e.target, "article");
	    ancestor.className =
		(ancestor.className == "minimized") ? "" : "minimized";
	} else if (e.target.nodeName == "P" && e.target.id == "replace") {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = myModule.ajaxHandler;
	    xhr.open("GET", "9_3.xml"); // "values.xml"
	    xhr.send();
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
