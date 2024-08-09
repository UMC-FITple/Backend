from flask import Blueprint, request, jsonify
from ..controllers.models import predict_user_bodytype, predict_user_style, json_to_df
# Blueprint 생성
predictions_blueprint = Blueprint('predictions', __name__)

@predictions_blueprint.route("/predict/bodytype", methods=["GET"])
def predict_bodytype():
    if request.method == "GET":
        # 쿼리 파라미터에서 데이터 추출
        data = json_to_df(request.args.get('data'))

        message = predict_user_bodytype(data)
        return jsonify(message)

@predictions_blueprint.route("/predict/style", methods=["GET"])
def predict_style():
    if request.method == "GET":
        message = {
            "name": "get request style"
        }
        return jsonify(message)
