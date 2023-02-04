document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("read-page-data-button").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.innerText'},
          function(result) {
            document.getElementById("page-data").innerText = result[0];
          });
      });
    });
  });
  