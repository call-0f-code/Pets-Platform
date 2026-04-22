from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()
url=os.getenv("url")

client=MongoClient(url)
# db=client.pawcare
# print(db)
# # print("Mongo url:", url)
# # print(db.list_collection_names())
# collection=db['chat_history']
# # collection.delete_many({})

# # for doc in collection.find():
#     # print(doc)
# collection.insert_one({
#     "session_id": session_id,
#     "user_id": user_id,
#     "role":role,
#     "content":content,
#     "created_at":datetime.now()
# })
def get_db():
    db=client.pawcare
    return db

 
