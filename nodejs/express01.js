#!/usr/bin/env node

// http://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

var express = require("express");
var app = express();
app.use(require("cookie-parser")());

app.use(function(req, res, next) {
	console.log("Request: ", req.headers);
	// console.log("Cookies: ", req.cookies);
	// console.log("url:", req.method, req.url, ", cookies:", req.cookies);
	next();
});

/*
app.get("/", function(req, res) {
	// res.send("Hello World!");
	res.sendFile(__dirname + "/public/index.html");
});
*/

app.get("/process_get", function(req, res) {
	// prepare output in JSON format
	response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	console.log("req.query: ", req.query);
	res.writeHead(200, {'content-type': 'text/plain'});
	res.end(JSON.stringify(response));
});

// Create application/x-www-form-urlencoded parser
var urlencodedParser = require("body-parser").urlencoded({extended: false});
// app.use(urlencodedParser);

app.post("/process_post", urlencodedParser, function(req, res) {
	// prepare output in JSON format
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name
	};
	console.log("req.body: ", req.body);
	res.writeHead(200, {'content-type': 'text/plain'});
	res.end(JSON.stringify(response));
});

var uploader = require("multer")({dest: "/tmp/"});

app.post("/file_upload", uploader.single("grok"), function(req, res) {
	// console.log(req.files.file.name);
	// console.log(req.files.file.path);
	// console.log(req.files.file.type);
	console.log("req.file: ", req.file);

	res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
	res.end(JSON.stringify({
		message: "File uploaded successfully",
		fieldname: req.file.fieldname, //originalname
		file: req.file.originalname,
		size: req.file.size
	}), "utf-8");
});

// http://stackoverflow.com/questions/7083045/fs-how-do-i-locate-a-parent-folder
	var path = require("path");
/*
	var htmldir = path.join(__dirname, "../../html5/");

	console.log("__dirname: %s", __dirname);
	console.log("htmldir %s", htmldir);
*/
// wkliang:20170418 - put following line here as handler for fall thru request
app.use(express.static(path.join(__dirname, "public")));
app.use("/html5", express.static(path.join(__dirname, "../html5")));

/* --- without socket.io
var server = app.listen(8080, function() {
	console.log("Example app listening at http://%s:%s",
		server.address().address,
		server.address().port);
});
*/

// http://socket.io/get-started/chat/
var http = require("http").Server(app);
var server = http.listen(8080, function() {
	console.log("Example app listening at http://%s:%s",
		server.address().address,
		server.address().port);
});

var io = require("socket.io")(http);
io.on('connection', function(socket) {
	console.log("a user connected");
	var timer = setInterval(function() {
		socket.emit('message', {'msg': new Date()});
		clearInterval(timer);
	}, 1000);
	io.emit('message', {'msg': "A new client connected"});
	socket.on('chat message', function(msg) {
		// console.log('message: ' + msg);
		// socket.emit('message', {'msg': "free from updating clock"});
		io.emit('chat message', {'msg' : msg});
	});
});
