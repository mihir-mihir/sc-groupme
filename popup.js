document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("list-paragraphs-button").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'Array.from(document.getElementById("term-20231").getElementsByClassName("section-id")).map(td => td.innerText)'},
          function(result) {
            let paragraphList = document.getElementById("paragraph-list");
            paragraphList.innerHTML = '';
            result[0].forEach(function(paragraph) {
              let listItem = document.createElement("li");
              listItem.innerText = paragraph;
              paragraphList.appendChild(listItem);

            });

            const axios = require('axios');

            async function createGroupChat(token, name) {
              const response = await axios.post('https://api.groupme.com/v3/groups', {
                name: name,
                share: false
              }, {
                headers: {
                  'X-Access-Token': token
                }
              });

              return response.data;
            }

            const token = 'AOz36zWxnjEibQItvOemMJUWerA3aAFgMFlXkDQm';
            const name = 'Buad 303';

            createGroupChat(token, name)
              .then(group => {
                console.log(`Created group chat with ID: ${group.response.id}`);
              })
              .catch(error => {
                console.error(error);
              });


            /*if(true) {
              const group = {
                name: 'My Group',
                description: 'This is my GroupMe group',
                image_url: 'https://example.com/group-image.jpg',
                share: false
              };
              fetch('https://api.groupme.com/v3/groups', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': 'AOz36zWxnjEibQItvOemMJUWerA3aAFgMFlXkDQm'
              },
              body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
          
          }
          else{
            const requestBody = {
              members: [
                {
                  user_id: 'HackBot'
                }
              ]
            };
          
            fetch(`https://api.groupme.com/v3/groups/${group_id}/members/join`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': 'AOz36zWxnjEibQItvOemMJUWerA3aAFgMFlXkDQm'
              },
              body: JSON.stringify(requestBody)
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
            
          
          }*/
          
            
          });
      });
    });

  });
