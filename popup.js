var getSectionIdsArray = `
(function() {
  const sectionIdsNames = {};
  const sections = Array.from(document.getElementById('term-20231').querySelectorAll('h3[data-course]'));
  for (const section of sections) {
    const sectionId = Array.from(section.getAttribute('data-sections').split(","), item => parseInt(item, 10))[0];
    const name = section.getAttribute('data-course');
    sectionIdsNames[sectionId] = name;
  } 
  console.log(sectionIdsNames);
  return sectionIdsNames;
  
})();
`

var sectionIdsNames = {};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("list-sections-button").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: getSectionIdsArray },
        function (result) {
          sectionIdsNames = result[0];
          // just displaying on screen
          const popup = document.getElementById('section-list');
          for (const [key, value] of Object.entries(result[0])) {
            const li = document.createElement('li');
            li.innerHTML = `${key}: ${value}`;
            popup.appendChild(li);
          }

          // closes extension window with log in to groupme button
          // window.close();

          /* ********************** */
          /* groupme authentication */
          /* ********************** */
          const clientId = "hYV3KgET0h7hjbg8b7lRtyegiYtVnHxpuiaAsavU2yscbQGp";

          // aurhentication url
          const authorizeUrl = `https://oauth.groupme.com/oauth/authorize?client_id=${clientId}`;

          // access token, populated later
          var accessToken;

          // redirect the user to the oauth url
          const authWindow = window.open(
            authorizeUrl,
            "OAuth",
            "width=500, height=500, left = (screen.width / 2) - (width / 2);"
          );

          // Listen for messages from callback
          authWindow.addEventListener("message", function (event) {
            // Check that the message is coming from correct source
            if (event.origin !== "chrome-extension://fjejhfmpndgfbflmhmchnlmpklohhklj") return;

            // Extract the access token from the message data
            accessToken = event.data;

            // Use the access token to make API requests
            authWindow.console.log("Access token:", accessToken, event.origin);
          });

          /* ************************ */
          /* making groupme api calls */
          /* ************************ */
          if (false) {
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
                'X-Access-Token': '8Ogob7rGvfTWhaZdO5gAZcOWC3CEnZOkIYMH47pM'
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
          else {

            clientId = "hYV3KgET0h7hjbg8b7lRtyegiYtVnHxpuiaAsavU2yscbQGp";
            redirectUri = "https://oauth.groupme.com/oauth/login_dialog?client_id=hYV3KgET0h7hjbg8b7lRtyegiYtVnHxpuiaAsavU2yscbQGp";

            app.get("/oauth", function (req, res) {
              res.redirect("https://api.groupme.com/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri);
            });

            app.get("/callback", function (req, res) {
              var code = req.query.code;

              // Use the authorization code to make a POST request to GroupMe's token endpoint
              request.post({
                url: "https://api.groupme.com/oauth/8Ogob7rGvfTWhaZdO5gAZcOWC3CEnZOkIYMH47pM",
                form: {
                  client_id: clientId,
                  code: code,
                  redirect_uri: redirectUri
                }
              }, function (error, response, body) {
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
                'X-Access-Token': '8Ogob7rGvfTWhaZdO5gAZcOWC3CEnZOkIYMH47pM'
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




