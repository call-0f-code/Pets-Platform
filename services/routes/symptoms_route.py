from flask import Blueprint,request,jsonify
from controllers.symptoms import check_symptoms
symptom_bp=Blueprint("symptoms", __name__)

@symptom_bp.route("/ask", methods=['POST'])
def ask():
    data=request.json
    s_id=data.get("session_id")
    u_id=data.get("user_id")
    msg=data.get("message")
    if not msg:
        return jsonify({"error": "message required"})
    reply=check_symptoms(s_id, u_id, msg)
    return jsonify({"reply":reply})
