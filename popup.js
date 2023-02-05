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

            if(true) {
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
            
            clientId = "hYV3KgET0h7hjbg8b7lRtyegiYtVnHxpuiaAsavU2yscbQGp";
            redirectUri = "https://oauth.groupme.com/oauth/login_dialog?client_id=hYV3KgET0h7hjbg8b7lRtyegiYtVnHxpuiaAsavU2yscbQGp";
            
            app.get("/oauth", function(req, res) {
              res.redirect("https://api.groupme.com/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri);
            });
            
            app.get("/callback", function(req, res) {
              var code = req.query.code;
            
              // Use the authorization code to make a POST request to GroupMe's token endpoint
              request.post({
                url: "https://api.groupme.com/oauth/access_token",
                form: {
                  client_id: clientId,
                  code: code,
                  redirect_uri: redirectUri
                }
              }, function(error, response, body) {
                var accessToken = JSON.parse(body).access_token;
            
                // Store the access token for later use
                
            
                // Redirect the user to your app's main page
                res.redirect("/");
              });
            });
            
            
            
            
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
            
          
          }
          
            
          });
      });
    });

  });
