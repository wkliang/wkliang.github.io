#!/usr/bin/env node

// https://github.com/mde/ejs

let ejs = require('ejs');
let str = '<% if (user) { %>'
	+ '<h2><%= user.name %></h2>'
	+ '<% } %>';

let template = ejs.compile(str, {/*options*/});
console.log( template({user: {name: 'John Doe'}}) );
console.log( ejs.render(str, {user: {name: "Peter Parker"}}, {/* options */}));

ejs.renderFile("index.ejs", {
		title: "this is Title",
		todos: [
			{_id: "1234567890"},
		]
	}, {},
	function(err, str) {
		if (err) console.error(err);
		else {
			// console.log("1st str:", str);
			ejs.renderFile("layout.ejs", {
					title: "layout title",
					body: str
				}, {},
				function(err, layoutstr) {
					if (err) console.log(err);
					else console.log("2nd pass:", layoutstr);
				});
		}
	});


// refer: ~/src/nodeclube/common/render_helper.js

let md = new require('markdown-it')();
md.set({
  html:         true,	// Enable HTML tags in source
  xhtmlOut:     false,	// Use '/' to close single tags (<br />)
  breaks:       false,	// Convert '\n' in paragraphs into <br>
  linkify:      true,	// Autoconvert URL-like text to links
  typographer:  true,	// Enable smartypants and other sweet transforms
});

// console.dir(md.renderer);
function markdown(x) {
	return md.render(x);
}

ejs.renderFile("markdown.ejs", {
		multiline: require('multiline'),
		markdown: markdown
	}, {},
	function(err, str) {
		if (err) console.error(err);
		else console.log("markdown:", str);
	});


