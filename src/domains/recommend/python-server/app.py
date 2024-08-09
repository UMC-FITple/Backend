from flask import Flask
from flask_cors import CORS
from routes.predictions import predictions_blueprint

# 서버 띄우고 접속 허용
app = Flask(__name__)

# 보안관련
CORS(app)

# 라우트 등록
app.register_blueprint(predictions_blueprint)

print(f"app.py __name__ : {__name__}")

if __name__ == '__main__':
    app.run(port=5000)