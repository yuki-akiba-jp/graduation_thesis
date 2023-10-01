import json
import os
from logging import StringTemplateStyle
from pprint import pprint

from dotenv import load_dotenv
from pymongo import MongoClient, collection

load_dotenv()
NEXT_PUBLIC_MONGODB_URI = os.getenv("NEXT_PUBLIC_MONGODB_URI")

client = MongoClient(NEXT_PUBLIC_MONGODB_URI)

db = client["test"]  # replace "database" with your database name
collection = db["problembystudents"]  # replace "collection" with your collection name


documents = collection.find()



for document in documents:
   # print(toprint)

    # pprint(document)
    # print(json.dumps(document, indent=4, ensure_ascii=False))
    # print(document['studentName'])
    print(document['studentId'])
    # print(document['choices'])



#   {
#     name: "パスワード1",
#     description: "どれが一番いいパスワード？",
#     answers: ["Maebashi1023City", "toKIo202xy", "wjxoSJAO2J1"],
#     choices: [
#       "password",
#       "cityMaebashi",
#       "tokyo2020",
#       "Password",
#       "onepiece",
#       "vwxyz11",
#     ],
#     selectedChoice: "",
#     reward: 100,
#   },
# import pandas as pd

# df = pd.DataFrame(list(documents))
# df = df.drop('decisionSkill', axis=1).join(df['decisionSkill'].apply(pd.Series).add_prefix('decisionSkill'))
# df = df.drop('answers',axis=1).join(df['answers'].apply(pd.Series).add_prefix('answer'))
# df = df.drop('choices', axis=1).join(df['choices'].apply(pd.Series).add_prefix('choice'))

# Reorder the columns as required
# columns_order = ["studentName", "studentId", "problemName", "description",
#                  "decisionSkill0", 
#                  "answer0", "answer1", "answer2",
#                  "choice0", "choice1", "choice2", "choice3", "choice4"]

# df = df[columns_order]
# df.sort_values(by=['studentId'], inplace=True)

# Write DataFrame to Excel
# df.to_excel('new_problems.xlsx', index=False)
