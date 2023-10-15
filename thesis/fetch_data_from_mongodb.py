import json
import os
from pprint import pprint

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
NEXT_PUBLIC_MONGODB_URI = os.getenv("NEXT_PUBLIC_MONGODB_URI")

client = MongoClient(NEXT_PUBLIC_MONGODB_URI)
db = client["test"]  # replace "test" with your database name
collection = db["teams"]  # replace "teams" with your collection name

documents = collection.find()

# Convert all documents into a list
doc_list = [doc for doc in documents]
# print(json.dumps(doc_list, ensure_ascii=False, indent=2))

for doc in doc_list:
    del doc["_id"]
    del doc["__v"]
for doc in doc_list:
    keys = doc.keys()
    for key in keys:
        objs = doc[key]
        if type(objs) == list:
            for obj in objs:
                if "_id" in obj:
                    del obj["_id"]


# print(doc_list[0])

# Open data.json in write mode with UTF-8 encoding
with open('data.json', 'w', encoding='utf-8') as file:
    pass
    # for doc in doc_list:
        # file.write(json.dumps(doc, ensure_ascii=False, indent=2))
    # Serialize the list to a JSON formatted string and write to the file
    file.write(json.dumps(doc_list,ensure_ascii=False, indent=2))  # indent=4 for pretty print

# If you still want to print each document to the console
# for doc in doc_list:
#     pprint(doc)
