from flask import Blueprint, jsonify, request
from controllers.diet_controller import diet_plan

diet_bp=Blueprint("diet_controller", __name__)
@diet_bp.route("/diet_plan", methods=['POST'])
def diet():
    try:
        data=request.json
        species=data.get('species')
        breed=data.get('breed')
        age=data.get('age')
        weight=data.get('weight')
        if not all ([species, breed, age, weight]):
            return jsonify({"error":"please provide all information"})
        reply=diet_plan(species, breed, age, weight)
        return jsonify({"reply":reply})
    except Exception as e:
        print("error in diet_plan route",e)
        return  jsonify({"error":"some information is missing"})
    

