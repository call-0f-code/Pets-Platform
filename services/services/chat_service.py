from config.db import get_db
from datetime import datetime
# print(collection)
# print(collection.count_documents({}))
# for d in  collection:
#     print(d)
# # def save_message(session_id, role, content):
#     db=get_db()
#     collection=db["chat_history"]

#     collection.insert_one({
#         "session_id":session_id,
#         "user_id":user_id,
#         "role":role,
#         "content": content,
#         "created_at":datetime.now()
#     })

def save_message(session_id,user_id, role, content):
    try:
        db=get_db()
        collection=db['chat_history']
        # count=collection.count_documents({"session_id"})
        # if count>=20:
        #     collection.delete_one({"created_at", 1})

        collection.insert_one({
            "session_id":session_id,
            "user_id":user_id,
            "role":role,
            "content":content,
            "created_at":datetime.now()
        })


        count=collection.count_documents({"session_id":session_id, "user_id":user_id})
        if count>20:
            lim =count-20
            old=collection.find({
                "session_id":session_id, "user_id":user_id},
                sort=[("created_at",1)],
                limit=lim)
            
            for d in old:
                collection.delete_one({"_id":d["_id"]})
    except Exception as e:
        print("error while saving messages")
        

# for i in range (20):

#     db=get_db()
#     collection=db['chat_history']
#     collection.insert_one({
#         "session_id":1234,
#         "role": "usert",
#         "content": "Hi it is testing msg",
#         "created_at":datetime.now()
#     })


def load_history(session_id, user_id):
    try:
        db=get_db()
        collection=db["chat_history"]
        messages=collection.find({
            "session_id":session_id,
            "user_id":user_id
        }, 
        sort=[("created_at", 1)],
        limit=20
        )

        history=[]
        for m in messages:
            history.append({
                "role": m["role"],
                "content": m["content"]
            })

        return history
    except Exception as e:
        print("error while loading history")
        return []    

    # print (history)


    
# load_history(1234)
# collection.delete_many({})