#!/usr/bin/env node

// https://www.oxxostudio.tw/articles/201512/spider-basic.html
// https://www.oxxostudio.tw/articles/201804/line-bot-apps-script.html
// https://www.oxxostudio.tw/articles/201805/backend-apps-script.html

const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const https = require('https');
const request = require('request');
const cheerio = require('cheerio');
const Iconv = require('iconv').Iconv;

const iconv = new Iconv('big5', 'utf-8//TRANSLIT//IGNORE');

function parseHtmlEntities(str) {
    return iconv.convert(str.toString().replace(/&#x([0-9,A-F]{1,3});/gi, function(match, numStr) {
        var num = parseInt(numStr, 16); // read num as normal number
	// console.log(`numStr: ${num}`);
        return String.fromCharCode(num);
    }));
}

const doParse = body => {
	// let bb = iconv.convert(body).toString();
	let trs = cheerio.load(body)("table table tbody tr");
	// console.log(`tr2: ${iconv.convert(jq.html(tr.eq(2)).text())}`);
	// let tr2 = parseHtmlEntities(tr.eq(2));
	// console.log(`tr2: ${tr2}`);
	for (let i = 0; i < trs.length; i++) {
		let tds = cheerio.load(trs.eq(i).toString())("td");
		for (let j = 0; j < tds.length; j++) {
			let td = tds.eq(j);
			// console.log(parseHtmlEntities(td.html()).toString());
			// console.log(iconv.convert(td.text()).toString());
			console.log(td.text());
		}
	}
};

(() => {
	return;
	request({
		url: "https://tw.stock.yahoo.com/d/i/rank.php?t=amt&e=tse&n=100",
		method: "GET",
		body: 'ReadStream'
	}, (error, response, body) => {
		if (error || !body) {
			console.log(`ERROR: ${error}`);
			return;
		}
		let bb = iconv.convert(body);
		/*
		fs.writeFile('yahoo', body, () => {
			console.log(`BODY: written`);
		});
		*/
		// console.log(`response: ${JSON.stringify(response)}`);
		let $ = cheerio.load(bb);
		let tr = $("table table tbody tr");
		// console.log(`tr: ${tr}`);
		console.log(`tr2: ${tr.eq(2)}`);
		console.log(`tr3: ${tr.eq(3)}`);
		// console.log(`tr3: ${iconv.convert(tr.eq(3).toString())}`);
	});
})();

// https://stackoverflow.com/questions/16903476/node-js-http-get-request-with-query-string-parameters
const updateParse = body => {
	let tra = [];
	let trs = cheerio.load(body)("table table tbody tr");
	for (let i = 3; i < trs.length; i++) {
		let tda = [];
		let tds = cheerio.load(trs.eq(i).toString())("td");
		for (let j = 0; j < tds.length; j++) {
			tda.push(tds.eq(j).text().replace(/\,/g,'.'));
		}
		tra.push(tda);
	}
	console.log(`tra.length: ${tra.length}`);
	console.log(`tra[0].length: ${tra[0].length}`);
	console.log(`tra: ${tra}`);
	return tra;
};

const AppURL = "https://script.google.com/macros/s/AKfycbxVbtAqHD_KnrtgjiMeGeH0K1YKV1gBuDQRDqsFtHNUIbQSlD7c/exec";
const SheetURL = "https://docs.google.com/spreadsheets/d/1Qb_IaMbJKcpmO1U-eXlGrsmNcriYjTSUcVhR0NGXoFY/edit";
const getUpdateSheet = qs => {
	https.get(`${AppURL}?${qs}`, {/*opt*/}, res => {
		let body = "";
		res.on('data', data => body += data);
		res.on('end', () => console.log(`getUpdateSheet: ${body}`));
	}).end();
};

// https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
const postUpdateSheet = qs => {
	let post = https.request({
		host: "script.google.com",
		path: "/macros/s/AKfycbxVbtAqHD_KnrtgjiMeGeH0K1YKV1gBuDQRDqsFtHNUIbQSlD7c/exec",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(qs)
		},
		method: 'POST'
	}, res => {
		let body = "";
		res.on('data', data => body += data);
		res.on('end', () => console.log(`postUpdateSheet: ${body}`));
	});
	post.write(qs);
	post.end();
};
// https://stackoverflow.com/questions/17836438/getting-binary-content-in-node-js-with-http-request
// https://stackoverflow.com/questions/11539411/how-to-debug-google-apps-script-aka-where-does-logger-log-log-to

const getData = (no, cb) => {
	https.get(`https://tw.stock.yahoo.com/d/i/rank.php?t=amt&e=tse&n=${no}`, res => {
		let body = [];
		res.on('data', data => body.push(data));
		res.on('end', () => {
			let arr = updateParse(iconv.convert(Buffer.concat(body)));
			let qs = querystring.stringify({
				url: SheetURL,
				name: "工作表1",
				row: arr.length,
				column: arr[0].length,
				insertType: 'top',
				data: arr.join(',')
			});
			cb(qs);
		});
	});
}

// getData(30, getUpdateSheet);
getData(100, postUpdateSheet);
