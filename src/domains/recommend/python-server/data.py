# 지금 상태라면 필요 x

import pandas as pd
from sklearn.preprocessing import StandardScaler

class UserData:
    def __init__(self, filepath):
        self.filepath = filepath
        self.data = self.load_data()
        self.scaler = StandardScaler()
        self.scaled_data = self.scale_data()

    def load_data(self):
        try:
            data = pd.read_csv(self.filepath)
            
            if data.empty:
                raise ValueError("데이터 파일이 비어있습니다.")
            return data
        except FileNotFoundError:
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {self.filepath}")
        except pd.errors.EmptyDataError:
            raise ValueError("데이터 파일이 비어있습니다.")
        except pd.errors.ParserError:
            raise ValueError("데이터 파일을 파싱하는 중 오류가 발생했습니다.")
        except Exception as e:
            raise Exception(f"데이터 로드 중 오류 발생: {str(e)}")
        
    def scale_data(self):
        try:
            features = self.data[['height', 'weight', 'shoulder_width', 'chest_circumference', 
                                  'arm_length', 'waist_circumsference', 
                                  'thigh_circumference', 'hip_circumference']]
            # 필요한 열이 있는지 확인
            required_columns = ['height', 'weight', 'shoulder_width', 'chest_circumference', 
                                'arm_length', 'waist_circumsference', 
                                'thigh_circumference', 'hip_circumference']
            for col in required_columns:
                if col not in features.columns:
                    raise ValueError(f"필요한 열이 누락되었습니다: {col}")
            return self.scaler.fit_transform(features)
        except Exception as e:
            raise Exception(f"데이터 스케일링 중 오류 발생: {str(e)}")


    def get_user_ids(self):
        try:
            return self.data['user_id'].values
        except KeyError:
            raise KeyError("user_id 열이 데이터에 존재하지 않습니다.")
        except Exception as e:
            raise Exception(f"user_id를 가져오는 중 오류 발생: {str(e)}")