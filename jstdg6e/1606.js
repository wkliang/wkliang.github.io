
// pg#440
// wkliang:20120914:
// 	the parameter passed into querySelectorAll()
//	seems to be title of stylesheet

function disableStylesheet(ss) {
    if (typeof ss === "number")
	document.styleSheets[ss].disabled = true;
    else {
	var sheets = document.querySelectorAll(ss);
	for (var i = 0; i < sheets.length; i++)
	    sheets[i].disabled = true;
    }
}

// pg#442 - test code
function styleSheetTestCode() {
    var ss = document.styleSheets[0];	// Get the first stylesheet
    var rules = ss.cssRules?ss.cssRules:ss.rules; // Get the stylesheet rules
    for (var i = 0; i < rules.length; i++) {	// Loop through those rules
	var rule = rules[i];
	if (!rule.selectorText)
	    continue;		// Skip @import and other nonstyle rules
	var selector = rule.selectorText;	// The selector
	var ruleText = rule.style.cssText;	// The styles, in text form

	// If the rule applies to h1 elements, apply it to h2 elements as well
	// Note this only works if the selector is literally "h1"
	if (selector == "h1") {
	    if (ss.insertRule)
		ss.insertRule("h2 {" + ruleText + "}", rules.length);
	    else if (ss.AddRule)
		ss.AddRule("h2", ruleText, rules.length);
	}

	// If the rule sets the text-decoration property, delete it.
	if (rule.style.textDecoration) {
	    if (ss.deleteRule)
		ss.deleteRule(i);
	    else if (ss.removeRule)
		ss.removeRule(i);
	    i--; // Adjust the loop index since the former rule i+1 is now rule i
	}
    }
}

// pg#442
// Example 16-6. Creating a new stylesheet

// Add a stylesheet to the document and populate it with the specified styles.
// The styles argument can be a string or an object. It it is a string, it
// is treated as the text of the stylesheet. If it is an object, then each
// property defines a style rule to be added to the stylesheet. Property
// names are selectors and their values are the corresponding styles
function addStyles(styles,sstitle) {
    // First, create a new stylesheet
    var styleElt, styleSheet;
    if (document.createStyleSheet) {	// If the IE API is defined, use it
	styleSheet = document.createStyleSheet();
    }
    else {
	var head = document.getElementsByTagName("head")[0];
	styleElt = document.createElement("style");	// New <style> element
	if (sstitle) {
	    styleElt.setAttribute("title",sstitle);
	}
	head.appendChild(styleElt);			// Insert it into <head>
	// Now the new stylesheet should be the last one
	styleSheet = document.styleSheets[document.styleSheets.length-1];
    }
    // Noe insert the styles into it
    if (typeof styles === "string") {
	// The argument is stylesheet text
	if (styleElt) styleElt.innerHTML = styles;
	else styleSheet.cssText = styles;	// The IE API
    }
    else {
	// The argument is an object of individual rules to insert
	var i = 0;
	for (selector in styles) {
	    if (styleSheet.insertRule) {
		var rule = selector + "{" + styles[selector] + "}";
		styleSheet.insertRule(rule, i++);
	    }
	    else {
		styleSheet.addRule(selector, styles[selector], i++);
	    }
	}
    }
}
