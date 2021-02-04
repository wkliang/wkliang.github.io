#!/usr/bin/env node

// https://www.oxxostudio.tw/articles/201512/spider-basic.html

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
	for (let i = 3; i < trs.length; i++) {
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

// request("https://tw.stock.yahoo.com/d/i/rank.php?t=amt&e=tse&n=100").pipe(fs.createWriteStream('yahoo1'));
/*
fs.readFile("yahoo1", (e,c) => {
	console.log(iconv.convert(c).toString());
});
*/

/*
https.request({
	hostname: "tw.stock.yahoo.com",
	path: "/d/i/rank.php?t=amt&e=tse&n=100",
	method: 'GET'
}, res => {
	let body = "";
	// res.setEncoding('binary');
	res.on('data', data => body += iconv.convert(data).toString());
	res.on('end', () => {
		doParse(body);
	});
}).end();
*/
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
const updateSheet = arr => {
	let qs = querystring.stringify({
		url: SheetURL,
		name: "工作表1",
		row: arr.length,
		column: arr[0].length,
		insertType: 'top',
		data: arr.join(',')
	});
	console.log(`qs: ${qs}`);

	/*
	https.request({
		method: 'GET',
		protocol: 'https:',
		hostname: "script.google.com",
		path: `/macros/s/AKfycbxVbtAqHD_KnrtgjiMeGeH0K1YKV1gBuDQRDqsFtHNUIbQSlD7c/exec?${qs}`
	}, res => {
	*/
	https.get(`${AppURL}?${qs}`, {/*opt*/}, res => {
		let body = "";
		res.on('data', data => body += data);
		res.on('end', () => console.log(`updateSheet: ${body}`));
	}).end();
};

const updateSheet1 = (arr) => {
	let qs = {
		url: SheetURL,
		name: "工作表1",
		row: arr.length,
		column: arr[0].length,
		insertType: 'top',
		data: arr.toString()
	};
	request({
		url: AppURL,
		method: 'GET',
		qs
	}, (error, response, body) => {
		if (error) {
			console.log(`updateSheet ERROR: ${error}`);
		} else {
			// console.log(`updateSheet RESPONSE: ${JSON.stringify(response)}`); 
			console.log(`updateSheet BODY: ${body}`);
		}
	});
};

// https://stackoverflow.com/questions/17836438/getting-binary-content-in-node-js-with-http-request

https.get("https://tw.stock.yahoo.com/d/i/rank.php?t=amt&e=tse&n=30", res => {
	let body = [];
	res.on('data', data => body.push(data));
	res.on('end', () => updateSheet(updateParse(iconv.convert(Buffer.concat(body)))));
});

// https://stackoverflow.com/questions/11539411/how-to-debug-google-apps-script-aka-where-does-logger-log-log-to
