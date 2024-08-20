import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SwaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger.config.js';
import { init } from './db/index.js';
import { status } from './config/response.status.js';
import { BaseError } from './config/error.js';
import { response } from './config/response.js';
import { signupRouter } from './routes/signup.js';
import { loginRouter } from './routes/login.js';
import { searchRouter } from './routes/search.js';
import { refreshTokenRouter } from './routes/refreshToken.js';
import { recommendRouter } from "./routes/recommend.routes.js"
import sizeUploadRoutes from './routes/uploadsize.routes.js';
import { AuthRouter } from './routes/auth.js';
import { closetRouter } from './routes/closet.js';
<<<<<<<<< Temporary merge branch 1
import { tempRouter } from './routes/temp-token.js';
=========
import { LoginCheck } from './middlewares/logincheck.js';
import { MyprofileRouter } from './routes/myprofile.js';
import { tempRouter } from './routes/temp-token.js';
import compareSizeRoutes from './routes/comparesize.routes.js';

dotenv.config();

// require('dotenv').config(); 
const app = express();
const port = 3000;

app.use(express.static('public'));  
// app.use(cors());                            // cors 방식 허용
// app.use(express.static('public'));          // 정적 파일 접근
// app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
// app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('환영합니다 핏플 백엔드!');
});

await init();

// 미들웨어 설정
app.use(express.static('public'));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use("/FITple/signup",signupRouter);
app.use("/FITple/login",loginRouter);
app.use('/FITple/search', searchRouter);
app.use('/FITple/uploadsize', sizeUploadRoutes);
app.use("/FITple/refreshToken",refreshTokenRouter);
app.use("/FITple/auth",AuthRouter)
app.use('/FITple/my/closet', closetRouter);
<<<<<<<<< Temporary merge branch 1
app.use('/temp-token', tempRouter);
=========
app.use("/FITple/myprofile",LoginCheck,MyprofileRouter);
app.use('/temp-token', tempRouter);
app.use('/FITple/comparesizes', compareSizeRoutes);
app.use('/FITple/recommend', recommendRouter)

// error handling
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
  res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});