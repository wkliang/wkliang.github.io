#!/usr/bin/env node

// Listing 3.18 Parallel flow control implemented in a simple application

var fs = require('fs');
var completedTasks = 0
var tasks = [];
var wordCounts = {};
var filesDir = "./watch";

function checkIfComplete() {
	completedTasks++;
	if (completedTasks == tasks.length) {
		for (var index in wordCounts)
			console.log(index + ": " + wordCounts[index]);
	}
}

function countWordsInText(text) {
	var words = text
		.toString()
		.toLowerCase()
		.split(/\W+/)
		.sort();
	for (var index in words) {
		var word = words[index];
		if (word) {
			wordCounts[word] =
				(wordCounts[word]) ? wordCounts[word] + 1 : 1;
		}
	}
}

fs.readdir(filesDir, function(err, files) {
	if (err)
		throw err;
	for (var index in files) {
		var task = ((file) => () =>
			fs.readFile(file, (err, text) => {
				if (err) throw err;
				countWordsInText(text);
				checkIfComplete();
			})
		)(filesDir + "/" + files[index]);
		tasks.push(task);
	}
	for (var task in tasks) {
		tasks[task]();
	}
});
