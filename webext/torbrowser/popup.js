
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
        tabs[0].id,
        { action: 'checkForWord' },
        function (response) {
          showResults(response.results);
        }
      );
    }
  );
}

function showResults(results) {
  var resultsElement = document.getElementById('popup-content');
  resultsElement.innerHTML = results ?
    `goto <a href="${results}" target="_blank">facebook onion</a>` :
    'FB iframe is NOT found';
}
