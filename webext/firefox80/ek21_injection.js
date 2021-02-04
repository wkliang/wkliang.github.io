//
// https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script
//
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('ek21.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
console.log(`inject ${s.src}`);
