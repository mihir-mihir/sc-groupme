import requests
import json

with open('data.json', 'r') as file:
    # Load the JSON data from the file
    data = json.load(file)



if creation_check == True:

    # GroupMe API access token
    access_token = "your_access_token"

    # Group ID of the group you want to join
    group_id = "group_id"

    # API endpoint to join a group
    join_group_url = f"https://api.groupme.com/v3/groups/{group_id}/join?token={access_token}"

    # Make a POST request to the join group endpoint
    response = requests.post(join_group_url)

    # Check if the request was successful
    # if response.status_code == 200:
    #     print("Successfully joined group")
    # else:
    #     print("Failed to join group. Error:", response.text)



if creation_check == False:

    # Your GroupMe API access token
    access_token = "AOz36zWxnjEibQItvOemMJUWerA3aAFgMFlXkDQm"

    # The name of the group (classname from json)
    group_name = "My Group"

    # The description of the group
    #description = "This is a sample group created using the GroupMe API"
    description = "This is a group created for the class " + group_name


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
    # if response.status_code == 201:
    #     print("Group created successfully")
    #     print(response.json())
    # else:
    #     print("Failed to create group")
    #     print(response.json())




def creation_check():
    #if sectionID exists, group already created, return true

    #else, return false