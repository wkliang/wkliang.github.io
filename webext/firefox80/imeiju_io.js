console.log("#1 imeiju_io.js: jQuery");
// document.addEventListener("DOMContentLoaded", function() {

// jQuery('.plyaer_box').css({'margin-top': '-5px', 'overflow':'auto'});
let play_box = document.querySelector('.plyaer_box');
console.log(`play_box = ${play_box == true}`);
if (play_box) {
	document.querySelector('.plyaer_box').style.marginTop = "-5px";
	document.querySelector('.plyaer_box').style.overflow = "auto";
}

// wkliang:20210124 --- remove iframe advertisement
const remove_by_selector = (selector) => {
	let cnt = 0;
	let es = document.querySelectorAll(selector);
	console.log(`remove ${selector} : ${es.length}`);
	for (let i = 0; i < es.length; ++i) {
		if (es[i].id != 'vodplay') { // 91mjw
			es[i].parentNode.removeChild(es[i]);
			++cnt;
		}
	}
	return cnt;
};
const imeiju_io_remove_iframes = () => {
	remove_by_selector('.btnclose');
	remove_by_selector('iframe');
	if (remove_by_selector('#note')) {
		clearInterval(imeiju_interval);
	}
}
const imeiju_interval = setInterval(imeiju_io_remove_iframes, 1000);
for (let i = 0; i < imeiju_interval; ++i)
	clearInterval(i);

// });
