import json

with open('data.json','r') as file:
    teams = json.JSONDecoder().decode(file.read())
    print(len(teams))
