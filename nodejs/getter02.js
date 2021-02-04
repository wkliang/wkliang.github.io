#!/usr/bin/env node

// getter / setter

var Car2 = Object.create(null); //this is an empty object, like {}
Car2.prototype = {
  getInfo: function() {
    return 'A ' + this.color + ' ' + this.desc + '.';
  }
};
 
var car2 = Object.create(Car2.prototype, {
		//value properties
		color:   { writable: true,  configurable:true, value: 'red' },
		//concrete desc value
		rawDesc: { writable: false, configurable:true, value: 'Porsche boxter' },
		// data properties (assigned using getters and setters)
		desc: { 
			configurable:true, 
			get: function ()      { return this.rawDesc.toUpperCase();  },
			set: function (value) { this.rawDesc = value.toLowerCase(); }  
		}
	}); 
console.log(car2.getInfo()); //displays 'A red PORSCHE BOXTER.'
car2.color = 'blue';
console.log(car2.getInfo()); //displays 'A blue PORSCHE BOXTER.'
