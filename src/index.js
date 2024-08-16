import dotenv from 'dotenv';
import bodyParser from 'body-parser';
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
import sizeUploadRoutes from './routes/uploadsize.routes.js';
import { AuthRouter } from './routes/auth.js';
import ocrRoutes from './routes/ocr.routes.js'; 

dotenv.config();

// require('dotenv').config(); 
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('환영합니다 핏플 백엔드!');
});

await init();

// 미들웨어 설정
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use("/FITple/signup",signupRouter);
app.use("/FITple/login",loginRouter);
app.use('/FITple/search', searchRouter);
app.use('/FITple/uploadsize', sizeUploadRoutes);

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
