import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import NearestNeighbors
import json
import joblib

def train_users_bodytype_knn(data):    # X는 받을 데이터의 dataframe 형태!
    # train set 지정
    X = data

    # KNN 모델 학습
    knn = NearestNeighbors(n_neighbors=10)  # 유사 사용자 10명 추천
    knn.fit(X)

    # 모델 저장
    joblib.dump(knn, '../models/similar_bodytype.pkl')  # 'similar_bodytype.pkl' 파일로 저장

def predict_user_bodytype(data):
    knn = joblib.load('../model/similar_bodytype.pkl')

    # 비슷한 사용자 추천
    distances, indices = knn.kneighbors(data)

    # 추천된 사용자 인덱스 출력
    print(f'비슷한 사용자 인덱스: {indices}')
    print(f'거리: {distances}')

    # json 형태 변환
    indices_json = json.dumps(indices.tolist())

    return indices_json

# 예시로 모델을 로드합니다. (모델 파일 경로를 적절히 수정하세요)
model = joblib.load('model.pkl')

# @predictions_blueprint.route('/predict', methods=['POST'])
# def predict():
#     # Node.js 서버로부터 데이터 수신
#     data = request.json
#     input_data = np.array(data['input'])  # 예시 데이터 처리

#     # 딥러닝 모델 예측 수행 (모델에 따라 수정 필요)
#     # prediction = model.predict(input_data)

#     # 예시 결과 (모델 예측 결과로 대체)
#     prediction = {'result': '예측 결과'}

#     return jsonify(prediction)

def train_users_styles_SVD(data):
    # train set 지정
    X = data

    # 모델 학습
    model = NearestNeighbors(n_neighbors=10)
    model.fit(X)

    # 모델 저장
    joblib.dump(model, '../models/simmlar_style.pkl')

def predict_user_style(data):
    knn = joblib.load('../model/similar_style.pkl')

    # 비슷한 사용자 추천
    distances, indices = knn.kneighbors(data)

    # 추천된 사용자 인덱스 출력
    print(f'비슷한 사용자 인덱스: {indices}')
    print(f'거리: {distances}')

    # json 형태 변환
    indices_json = json.dumps(indices.tolist())

    return indices_json

def json_to_df(data):
    new_user = np.array([[data['height'], data['weight'], data['shoulder_width'],
                          data['arm_length'], data['chest_circumference'],
                          data['waist_circumference'], data['thigh_circumference']]])
    return new_user

# def train_recommended_product_cf(data):
#     # train set 지정
#     X = data

#     # 모델 학습
#     model = NearestNeighbors(n_neighbors=10)
#     model.fit(X)

#     # 모델 저장
#     joblib.dump(model, '../models/recommend_product.pkl')
