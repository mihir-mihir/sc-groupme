document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("list-paragraphs-button").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'Array.from(document.getElementsByTagName("td")).map(td => td.innerText)'},
          function(result) {
            let paragraphList = document.getElementById("paragraph-list");
            paragraphList.innerHTML = '';
            result[0].forEach(function(paragraph) {
              let listItem = document.createElement("li");
              listItem.innerText = paragraph;
              paragraphList.appendChild(listItem);
            });
          });
      });
    });
  });
  
  