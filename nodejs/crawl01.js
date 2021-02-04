#!/usr/bin/env node

// https://www.oxxostudio.tw/articles/201706/google-spreadsheet-7-nodejs-stock-spider.html
// https://stackoverflow.com/questions/3883780/javascript-recursive-anonymous-function

const request = require('request');

const newDate = () => {
	let x = new Date();
	let y = x.getFullYear();
	let m = x.getMonth() + 1;
	let d = x.getDate();
	return `${y}${(m<10)?'0'+m:m}${(d<10)?'0'+d:d}`
};

const TodayURL = `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${newDate()}`;
const AppURL = "https://script.google.com/macros/s/AKfycbxVbtAqHD_KnrtgjiMeGeH0K1YKV1gBuDQRDqsFtHNUIbQSlD7c/exec";
const SheetURL = "https://docs.google.com/spreadsheets/d/1Qb_IaMbJKcpmO1U-eXlGrsmNcriYjTSUcVhR0NGXoFY/edit";

const updateSheet = (arr) => {
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

const doRequest = (ss, rr, cb) => {
	if (!ss.length) return cb(null, rr);
	let url = `${TodayURL}&stockNo=${ss.shift()}`;
	request({
		url,
		method: 'GET'
	}, function(error, response, body) {
		if (error || !body) return cb(error, rr);
		if (body.indexOf('html') != -1) {
			return cb(`ERROR: ${body}`, rr);
		}
		// console.log(`GOT: ${body}`);
		let bb = JSON.parse(body);
		let json = bb.data;
		let title = bb.title.split(' ');
		let data = json[json.length - 1];
		rr.push([Date.now(), title[1], title[2], data[data.length -3]]);
		doRequest(ss, rr, cb);
	});
};

doRequest([2454, 2317, 2002, 2330, 2412], [], (err, result) => {
		console.log(`err: ${err}`);
		console.log(`result: ${JSON.stringify(result)}`);
		if (!err) updateSheet(result);
	});

// {"stat":"OK","date":"20201217","title":"109年12月 2330 台積電           各日成交資訊","fields":["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"],"data":[["109/12/01","38,341,265","18,719,729,411","489.50","490.00","483.50","490.00","+9.50","24,827"],["109/12/02","60,208,035","29,970,556,095","499.50","500.00","493.50","499.00","+9.00","35,624"],["109/12/03","36,919,644","18,369,786,608","499.50","499.50","495.00","497.00","-2.00","25,651"],["109/12/04","54,471,042","27,307,472,890","498.50","505.00","497.50","503.00","+6.00","35,708"],["109/12/07","45,493,551","23,243,392,840","512.00","515.00","506.00","514.00","+11.00","34,767"],["109/12/08","41,830,257","21,673,267,551","514.00","525.00","509.00","524.00","+10.00","35,895"],["109/12/09","46,831,705","24,416,275,048","521.00","524.00","520.00","520.00","-4.00","31,749"],["109/12/10","43,991,133","22,516,917,355","511.00","515.00","510.00","512.00","-8.00","49,079"],["109/12/11","51,296,611","26,259,941,709","517.00","517.00","505.00","516.00","+4.00","50,929"],["109/12/14","30,809,747","15,703,026,732","512.00","513.00","508.00","508.00","-8.00","33,415"],["109/12/15","43,059,899","21,780,400,998","507.00","510.00","504.00","504.00","-4.00","43,967"],["109/12/16","53,661,282","27,504,184,031","509.00","515.00","507.00","512.00","+8.00","30,574"],["109/12/17","39,285,785","20,052,530,030","515.00","515.00","508.00","508.00","X0.00","34,785"]],"notes":["符號說明:+/-/X表示漲/跌/不比價","當日統計資訊含一般、零股、盤後定價、鉅額交易，不含拍賣、標購。","ETF證券代號第六碼為K、M、S、C者，表示該ETF以外幣交易。"]}
