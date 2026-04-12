from flask import Flask
from flask_cors import CORS
from routes.symptoms_route import symptom_bp
# from routes.diet_routes import diet_bp
# from routes.health_routes import health_bp

app=Flask(__name__)
CORS(app)

app.register_blueprint(symptom_bp)
# app.register_blueprint(diet_bp)
# app.register_blueprint(health_bp)

@app.route("/")
def home():
    return {"message":"API running..."}

if __name__=="__main__":
    app.run(debug=True, port=5000)
    