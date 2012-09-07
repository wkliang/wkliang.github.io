
//
// http://clubajax.org/javascript-scope-and-context-not-the-same-thing/
// http://clubajax.org/javascript-context-call-and-bind-ninja-level/

var C = function(x) {
	this.x = x;
};

C.prototype.otherMethod = function(f) {
	f();
};

C.prototype.m = function(y) {
	var myObj = this;
	this.f = function(t) {
		var now = new Date();
		console.log("x:"+this.x+", y:"+y+", z:"+(now-t));
	};
	// setTimeout(function() {myObj.f();}, 1);	// OK
	// setTimeout(myObj.f, 1);	// x:undefined, y:5,4,7,6
	// setTimeout(this.f, 1);	// x:undefined
	// setTimeout(this.f.bind(this,new Date()), 1);	// Very OK
	/* */
	setTimeout((function(f,o,t) {
				return function() {
					f.call(o,t);
				};
			})(this.f,this,new Date()) ,1); // Very OK, like bind
	/* */
	// this.otherMethod(this.f);	// instance:undefined
	// this.otherMethod(myObj.f);	// instance:undefined
	// this.otherMethod(function() {myObj.f();});	// OK
};

var c1 = new C(1);
c1.m(5);

var c2 = new C(2);
c2.m(4);

c1.m(7);
c2.m(6);
