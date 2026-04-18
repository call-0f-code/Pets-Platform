from flask import Blueprint,request,jsonify
# from controllers.symptoms import check_symptoms
from controllers.health_insights import health_in
health_bp=Blueprint("health_insights", __name__)

@health_bp.route("/healthIn", methods=['POST'])
def healthIn():
    try:
        data=request.json
        pet=data.get('pet')
        breed=data.get('breed')
        age=data.get('age')
        if not all ([pet, breed, age]):
            return jsonify({"error": "some information is missing "})
        reply=health_in(pet, breed, age)
        return jsonify ({"reply": reply})
    except Exception as e:
        print("error in helth route",e)
        return jsonify({"error":"some information is missing"})

