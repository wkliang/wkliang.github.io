#!/usr/bin/env node

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals 

function myTag(strings, personExp, ageExp) {
  var str0 = strings[0]; // "That "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  var ageStr = (ageExp > 99) ? 'centenarian' : 'youngster';

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr} ... ${strings.length}`;
}

var person = 'Mike';
var age = 28;
var output = myTag`That ${ person } is a ${ age }`;

console.log(output);
// That Mike is a youngster

function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}!`;
let t1Result = t1Closure('Y', 'A');  // "YAY!"
console.log(t1Result);

var t2Closure = template`${0} ${'foo'}!`;
let t2Result = t2Closure('Hello', {foo: 'World'});  // "Hello World!"
console.log(t2Result);


// Raw strings
//
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n''

var str = String.raw`Hi\n${2+3}!`;
// "Hi\n5!"

console.log(
	str.length, // 6
	str.split('').join(',') // "H,i,\,n,5,!"
);
