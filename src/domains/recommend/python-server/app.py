from flask import Flask, request, jsonify
from flask_cors import CORS
from .model import RecommendModel
import pandas as pd
import json

app = Flask(__name__)

# 보안관련
CORS(app)

@app.route('/recommend/bodyinfo/', methods=['POST'])
def recommend_user_bodyinfo():
    # 클라이언트로부터 받은 bodyinfo 데이터
    data = request.json

    data_df = pd.DataFrame(data)

    # 터미널에 출력
    print(f"data: ", data)
    print(f"추천 요청 받은 체형 정보: \n", data_df)
    
    model = RecommendModel(model_path="./models/model_bodyinfo.joblib")
    
    # 필요한 후처리 및 응답 생성
    result = model.recommend_bodyinfo(data_df)
    print(result)

    # 딕셔너리 형태로 변환
    result_dict = {'result': result}


    print('정상작동')
    return json.dumps(result_dict)

@app.route('/recommend/style/', methods=['POST'])
def recommend_user_style():
    # 클라이언트로부터 받은 bodyinfo 데이터
    data = request.json

    data_df = pd.DataFrame(data)

    # 터미널에 출력
    print(f"data: ", data)
    print(f"추천 요청 받은 스타일 정보: \n", data_df)
    
    model = RecommendModel(model_path="./models/model_style.joblib")
    
    # 필요한 후처리 및 응답 생성
    result = model.recommend_style(data_df)
    print(result)

    # 딕셔너리 형태로 변환
    result_dict = {'result': result}


    print('정상작동')
    # 예시로 간단한 응답을 반환합니다.
    return json.dumps(result_dict)

@app.route('/train/bodyinfo', methods=['POST'])
def train_user_bodyinfo():
    # 클라이언트로부터 받은 bodyinfo 데이터
    data = request.json
    print(f"data: ", data)

    try:
        data_df = pd.DataFrame(data)
        # 터미널에 출력
        print(f"훈련 요청 받은 체형 정보: \n", data_df)

        data_cleand = data_df.dropna()
        print(f"nan값 제거: \n", data_cleand)

        model = RecommendModel()

        result = model.train_bodyinfo(data_cleand)
        if result is True:
            return jsonify({"message": "모델 훈련 성공"}), 200
        else:
            return jsonify({"error": result}), 400  # 오류 메시지 포함

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # 최상위 오류 처리

@app.route('/train/style', methods=['POST'])
def train_user_style():
    # 클라이언트로부터 받은 bodyinfo 데이터
    data = request.json
    try:
        data_df = pd.DataFrame(data)
        # 터미널에 출력
        print(f"훈련 요청 받은 체형 정보: \n", data_df)

        data_cleand = data_df.dropna()
        print(f"nan값 제거: \n", data_cleand)

        model = RecommendModel()

        result = model.train_style(data_cleand)
        if result is True:
            return jsonify({"message": "모델 훈련 성공"}), 200
        else:
            return jsonify({"error": result}), 400  # 오류 메시지 포함

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # 최상위 오류 처리
        

print(f"app.py __name__ : {__name__}")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
