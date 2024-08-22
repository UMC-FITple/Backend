import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neighbors import NearestNeighbors
import joblib

class RecommendModel:
    def __init__(self, model_path=None):
        self.uuids = None  # uuid를 저장할 변수 추가
        self.model = None
        if model_path is not None:
            self.load_model(model_path)

    # 사용자 데이터(전체 데이터) 받아 훈련
    def train_bodyinfo(self, user_data):
        try:
            # 특성과 레이블 정의
            X = user_data[['height', 'weight', 'shoulder_width', 'chest_circumference',
                            'arm_length', 'waist_circumference',
                            'thigh_circumference', 'hip_circumference']]
            y = user_data['uuid']

            # uuid 저장
            self.uuids = y.tolist()  # uuid를 리스트로 저장

            # KNN 모델 훈련
            self.model = KNeighborsClassifier(n_neighbors=3)
            self.model.fit(X, y)

            self.save_model('./models/model_bodyinfo.joblib')
            return True  # 성공 시 True 반환

        except Exception as e:
            print(f"모델 훈련 중 오류 발생: {str(e)}")
            return str(e)

    def train_style(self, user_data):
        try:
            columns = ["심플베이직", "캐주얼", "모던시크", "러블리", "아메카지", "유니크", "유니섹스", "스트리트", "스포티"]

            self.uuids = user_data['uuid'].tolist()

            user_style_matrix = user_data.explode('style_name')

            user_style_matrix = pd.get_dummies(user_style_matrix, columns=['style_name'], prefix='style', drop_first=False)

            user_style_matrix['uuid'] = user_style_matrix['uuid'].astype(str)
            user_style_matrix = user_style_matrix.groupby('uuid').sum().reset_index()

            user_style_matrix = user_style_matrix.reindex(columns=['uuid'] + columns, fill_value=0)
            user_style_matrix = user_style_matrix.astype(int)

            self.model = NearestNeighbors(n_neighbors=10, metric='cosine')
            self.model.fit(user_style_matrix.drop('uuid', axis=1))

            self.save_model('./models/model_style.joblib')
            return True

        except Exception as e:
            print(f"모델 훈련 중 오류 발생: {str(e)}")
            return str(e)

    # 훈련된 모델 저장 (./models/...)
    def save_model(self, filename):
        try:
            joblib.dump((self.model, self.uuids), filename)
        except Exception as e:
            print(f"모델 저장 중 오류 발생: {str(e)}")

    # 훈련된 모델 불러오기 (,/models/...)
    def load_model(self, filename):
        try:
            self.model, self.uuids = joblib.load(filename)
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
            
            # uuid 리스트에서 인덱스를 사용하여 해당 uuid 반환
            recommended_uuids = []
            for i in indices.tolist()[0]:
                print(i)
                print(self.uuids[i])
                recommended_uuids.append(self.uuids[i])

            print(recommended_uuids)

            return recommended_uuids
        except Exception as e:
            print(f"추천 중 오류 발생: {str(e)}")
            return None
        
    import pandas as pd

    def recommend_style(self, new_user_styles):
        try:
            new_user_df = pd.DataFrame(new_user_styles)
            new_user_df['uuid'] = 1

            print("Initial new_user_df:")
            print(new_user_df)

            new_user_df = new_user_df.explode('style_name')
            print("After explode:")
            print(new_user_df)

            new_user_one_hot = pd.get_dummies(new_user_df['style_name'], prefix=None, drop_first=False)
            new_user_one_hot['uuid'] = new_user_df['uuid'].iloc[0]

            print("One-hot encoded DataFrame:")
            print(new_user_one_hot)

            new_user_one_hot = new_user_one_hot.groupby('uuid').sum().reset_index()
            print("Grouped by uuid:")
            print(new_user_one_hot)

            existing_columns = ['심플베이직', '캐주얼', '모던시크', '러블리', '아메카지', '유니크', '유니섹스', '스트리트', '스포티']
            new_user_one_hot = new_user_one_hot.reindex(columns=existing_columns, fill_value=0)
            print("Reindexed DataFrame:")
            print(new_user_one_hot)

            new_user_one_hot = new_user_one_hot.astype(int)
            new_user_one_hot['uuid'] = 1

            distances, indices = self.model.kneighbors(new_user_one_hot.drop('uuid', axis=1).values.reshape(1, -1), n_neighbors=10)

            recommended_uuids = [self.uuids[i] for i in indices.flatten()]

            return recommended_uuids

        except Exception as e:
            print(f"추천 중 오류 발생: {str(e)}")
            return None