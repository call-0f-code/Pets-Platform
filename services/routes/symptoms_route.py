from flask import Blueprint,request,jsonify
from controllers.symptoms import check_symptoms
# from controllers.health_insights import health_in
symptom_bp=Blueprint("symptoms", __name__)
# health_bp=Blueprint("health_insights", __name__)

@symptom_bp.route("/ask", methods=['POST'])
def ask():
    try:
        data=request.json
        s_id=data.get("session_id")
        u_id=data.get("user_id")
        msg=data.get("message")
        if not msg:
            return jsonify({"error": "message required"})
        reply=check_symptoms(s_id, u_id, msg)
        return jsonify({"reply":reply})
    except Exception as e:
        print("Error in ask ",e)
        return jsonify({"error":"Internal Server error"}), 500



