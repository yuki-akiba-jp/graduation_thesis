import json
import os
from pprint import pprint

from bson import ObjectId
from dotenv import load_dotenv
from pymongo import MongoClient, collection

load_dotenv()
NEXT_PUBLIC_MONGODB_URI = os.getenv("NEXT_PUBLIC_MONGODB_URI")
print(NEXT_PUBLIC_MONGODB_URI)

client = MongoClient(NEXT_PUBLIC_MONGODB_URI)

db = client["test"]  # replace "database" with your database name
collection = db["problembystudents"]  # replace "collection" with your collection name

documents = collection.find()

for document in documents:
    # pprint(document)
    print(document['studentName'])
    print(document['studentId'])
    print(document['choices'])

