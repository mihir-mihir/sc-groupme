import requests

# Your GroupMe API access token
access_token = "your_access_token_here"

# The name of the group
group_name = "My Group"

# The description of the group
description = "This is a sample group created using the GroupMe API"

# The API endpoint for creating a group
url = "https://api.groupme.com/v3/groups"

# The payload containing the group details
payload = {
    "name": group_name,
    "description": description,
    "share": False
}

# Add the access token to the header
headers = {
    "X-Access-Token": access_token,
    "Content-Type": "application/json"
}

# Send a POST request to the API to create the group
response = requests.post(url, headers=headers, json=payload)

# Check if the group was created successfully
if response.status_code == 201:
    print("Group created successfully")
    print(response.json())
else:
    print("Failed to create group")
    print(response.json())
