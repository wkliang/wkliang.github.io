#!/usr/bin/env node

// http://mongoosejs.com/docs/guide.html

// https://blog.xervo.io/getting-started-with-mongoose
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var mongoose = require('mongoose');

// use this code,before the mongo connection and this will resolve the promise problem. 
mongoose.Promise = global.Promise;

// test is a database of mongoDB
var db = mongoose.connect("mongodb://localhost/test");

/*
mongoose.on('error', console.error);
mongoose.once('open', function() {
	console.log("Create your schemas and models here...");
});
*/

var MovieSchema = new mongoose.Schema({
	title: {type: String, require: true},
	imdb: {type: String, required: true, unique: true},
	rating: Number,
	releaseYear: Number,
	hasCreditCookie: Boolean,
	updated_at: Date
});

MovieSchema.statics.findAllWithCreditCookies = function(cb) {
	return this.find({hasCreditCookie: true}, cb);
};

MovieSchema.methods.inc_rating = function() {
	if (this.rating) this.rating += 0.1;
	else this.rating = 0.1;
	return this;
};

MovieSchema.methods.dec_rating = function() {
	if (this.rating) this.rating -= 0.1;
	else this.rating = 0.0;
	return this;
};

MovieSchema.pre('save', function(next) {
	this.updated_at = new Date();
	next();
});

var Movie = mongoose.model('Movie', MovieSchema);

var movieArrival = new Movie({
	title: "Arrival",
	rating: "8.0",
	releaseYear: 2016,
	imdb: "tt2543164",
	hasCreditCookie: true
});

movieArrival
.inc_rating(function(err, rating) {
	if (err)
		throw err;
	console.log("Rating:", rating);
})
.save(/* function(err, movie) {
	if (err)
		return console.error(err);
	// console.dir(movie);
	console.log("saved.");
}*/)
.then(function(movie) {
	console.log(
		"updated_at:", movie.updated_at, "\n",
		"imdb:", movie.imdb, "\n",
		"saved");
})
.catch(function(err) {
	console.error(err);
});

Movie.findOne({imdb: "tt2543164"}, function(err, movie) {
	console.log("findOne:", "tt2543164");
	if (err) {
		new Movie({
			title: "Hidden Figures",
			rating: "7.9",
			releaseYear: 2016,
			imdb: "tt4846340",
			hasCreditCookie: true
		}).save(function(err, movie) {
			if (err)
				return console.error(err);
			console.dir(movie);
		});
		return console.log("Error: ", err);
	}
	// console.dir(movie);
	console.log("movie.imdb:", movie.imdb);
	console.log("movie.title:", movie.title);
});

Movie.findAllWithCreditCookies(function(err, movies) {
	if (err)
		return console.error(err);
	// console.dir(movies);
	console.log("movies.length:", movies.length);
});

// http://stackoverflow.com/questions/8813838/properly-close-mongooses-connection-once-youre-done

mongoose.disconnect();
// mongoose.connection.close();
// db.disconnect();
