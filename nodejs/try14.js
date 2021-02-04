#!/usr/bin/env node

// http://fred-zone.blogspot.com/2017/04/javascript-memorization.html

const getData = (records, id) => records.find(data => data.id === id);

const list = ['1', '2', '3', 'hello', {id: 'helloId'}, 'z', {id: 'zz'}, 'zzz'];
let data = getData(list, 'helloId');

console.log('data+: ' + data);
console.log('data+toString: ' + data.toString());
console.log('data,: ', data);
console.log('list.find(zzz): ', list.find((data) => data === 'zzz'));
console.log('list.find(>2): ', list.find((data) => data.length > 2));

const newGetData = getData.bind(this, list);
console.log('newGetData: ', newGetData('zz'));

const newGetData2 = getData.bind(null, list);
console.log('newGetData2: ', newGetData2('zz'));

const iList = [];
for (let i = 1; i < 100; ++i) iList.push(i);

console.log('iList: ', iList.find((i) => i % 2));
