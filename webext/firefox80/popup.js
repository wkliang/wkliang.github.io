
/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  let errMsg =
  document.getElementById('error-content').innerText = `ERROR: ${error.message}`;
  console.error(errMsg);
}

// document.addEventListener('DOMContentLoaded', function(event) {
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
  console.log("browser.tabs.executeScript(content.js)");
  // browser.tabs.executeScript({file: "/content_script/chk_plugins.js"})
  browser.tabs.executeScript({file: "content.js"})
    .then(getResults)
    .catch(reportExecuteScriptError);
// });

function getResults() {
  console.log('getResluts()');
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id, { action: 'checkForWord' },
        function (response) {
          showResults(response.results);
        }
      );
    }
  );
}

function sendCommand(target) {
  console.log('sendCommand()');
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id, { action: 'eventTarget', data: ''+target },
        function (response) {
  	  document.getElementById('popup-content').innerHTML = `${''+target} : ${response}`;
        }
      );
    }
  );
}

function showResults(results) {
  const reducer = (a,c,i) =>  a+`<li><a href="${c}" target="_target">${i}</a></li>`; 
  document.getElementById('popup-content').innerHTML =
	`<ul id="popup-list">${results.reduce(reducer, "")}</ul>`;
//    `goto ${results} <a href="" target="_blank">facebook onion</a>` :
//    'FB iframe is NOT found';
  document.getElementById('popup-list').addEventListener('click',
	  (e) => {
		  sendCommand(e.target);
		  e.preventDefault();
	  }, true);
}
