#!/usr/bin/env node

/* I came up with this very jimmy rigged method of a multi lined string.
 * Since converting a function into a string also returns any comments inside
 * the function you can use the comments as your string using a multilined 
 * comment ** . You just have to trim off the ends and you have your string.
 */

var myString = function(){/*
	This is some
	awsome multi-lined
	string using a comment
	inside a function
	returned as a string
	Enjoy the jimmy rigged code.
*/}.toString();

console.log(myString);
console.log(myString.slice(14,-3));
