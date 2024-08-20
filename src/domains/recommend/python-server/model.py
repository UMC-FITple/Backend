import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neighbors import NearestNeighbors
import joblib

class RecommendModel:
    def __init__(self, model_path=None):
        if model_path is not None:
            self.load_model(model_path)

    # 사용자 데이터(전체 데이터) 받아 훈련
    def train_bodyinfo(self, user_data):
        try:
            # 특성과 레이블 정의
            X = user_data[['height', 'weight', 'shoulder_width', 'chest_circumference',
                            'arm_length', 'waist_circumsference',
                            'thigh_circumference', 'hip_circumference']]
            y = user_data['user_id']

            # KNN 모델 훈련
            self.model = KNeighborsClassifier(n_neighbors=3)
            self.model.fit(X, y)

            self.save_model('./models/model_bodyinfo.joblib')
            return True  # 성공 시 True 반환

        except Exception as e:
            print(f"모델 훈련 중 오류 발생: {str(e)}")
            return str(e)

    # 사용자 데이터(전체 데이터) 받아 훈련 - 스타일
    def train_style(self, user_data):
        try:
            # 스타일을 원-핫 인코딩하여 사용자-스타일 행렬 생성
            columns = ["심플베이직", "캐주얼", "모던시크", "러블리", "아메카지", "유니크", "유니섹스", "스트리트", "스포티"]

            # 원-핫 인코딩 후, 원하는 순서로 열 설정
            user_style_matrix = pd.get_dummies(user_data[['user_id', 'style_name']])
            user_style_matrix = user_style_matrix.groupby('user_id').sum()

            # 열 이름을 원하는 순서로 재정렬
            user_style_matrix = user_style_matrix.reindex(columns=[f'style_{style}' for style in columns], fill_value=0)

            # 불린 값을 정수형으로 변환
            user_style_matrix = user_style_matrix.astype(int)

            print(user_style_matrix.head())

            columns = user_style_matrix.columns

            # KNN 모델 학습
            self.model = NearestNeighbors(n_neighbors=10, metric='cosine')
            self.model.fit(user_style_matrix)

            # 모델 저장 (joblib 형식으로 저장)
            self.save_model('./models/model_style.joblib')
            return True  # 성공 시 True 반환
        
        except Exception as e:
            print(f"모델 훈련 중 오류 발생: {str(e)}")
            return str(e)

    # 훈련된 모델 저장 (./models/...)
    def save_model(self, filename):
        try:
            joblib.dump(self.model, filename)
        except Exception as e:
            print(f"모델 저장 중 오류 발생: {str(e)}")

    # 훈려된 모델 불러오기 (,/models/...)
    def load_model(self, filename):
        try:
            self.model = joblib.load(filename)
        except FileNotFoundError:
            print(f"모델 파일을 찾을 수 없습니다: {filename}")
        except Exception as e:
            print(f"모델 로드 중 오류 발생: {str(e)}")

    # 훈련된 모델로 추천 - 비슷한 체형
    def recommend_bodyinfo(self, new_data):
        weights = pd.Series({
            'height': 1,
            'weight': 1,
            'shoulder_width': 0.7,
            'chest_circumference': 0.7,
            'arm_length': 0.7,
            'waist_circumference': 0.7,
            'thigh_circumference': 0.7,
            'hip_circumference': 0.7
        })

        try:
            distances, indices = self.model.kneighbors(new_data * weights, n_neighbors=10)
            
            print(indices)
            print(distances)

            return indices.tolist()[0]
        except Exception as e:
            print(f"추천 중 오류 발생: {str(e)}")
            return None
        
    # 훈련된 모델로 추천 - 비슷한 체형
    def recommend_style(self, new_user_styles):
        try:
            # 새 사용자 스타일을 원-핫 인코딩
            new_user_df = pd.DataFrame(new_user_styles)
            new_user_df['user_id'] = 1  # 예시로 임의의 user_id 설정
    
            new_user_one_hot = pd.get_dummies(new_user_df[['user_id', 'style_name']], prefix='style')
            new_user_one_hot = new_user_one_hot.groupby('user_id').sum()
    
            # 기존 사용자 스타일 행렬의 컬럼을 불러오기
            existing_columns = ['style_심플베이직', 'style_캐주얼', 'style_모던시크', 'style_러블리', 'style_아메카지', 'style_유니크', 'style_유니섹스', 'style_스트리트', 'style_스포티']
    
            # 새로운 사용자 데이터의 컬럼을 기존 컬럼에 맞추기
            new_user_one_hot = new_user_one_hot.reindex(columns=existing_columns, fill_value=0)

            # 불린 값을 정수형으로 변환
            new_user_one_hot = new_user_one_hot.astype(int)

            print(new_user_one_hot.head())

            # 가장 가까운 사용자 찾기
            distances, indices = self.model.kneighbors(new_user_one_hot.values.reshape(1, -1), n_neighbors=10)
    
            return indices.tolist()[0]
        except Exception as e:
            print(f"추천 중 오류 발생: {str(e)}")
            return None