from flask import Blueprint, request, jsonify

# Blueprint 생성
predictions_blueprint = Blueprint('trains', __name__)

@predictions_blueprint.route("/train", methods=["GET", "POST"])
def predict():
    if request.method == "POST": 
        message = {
            "name": "post요청"
        }
        return jsonify(message)
    
    if request.method == "GET":
        message = {
            "name": "get요청"
        }
        return jsonify(message)

@predictions_blueprint.route("/train", methods=["GET", "POST"])
def predict2():
    if request.method == "POST":
        message = {
            "name": "post요청 2"
        }
        return jsonify(message)