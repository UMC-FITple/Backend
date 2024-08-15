import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SwaggerUi from 'swagger-ui-express';
import { specs } from './src/swagger/swagger.config.js';
import { init } from './src/db/index.js';
import { status } from './src/config/response.status.js';
import { BaseError } from './src/config/error.js';
import { response } from './src/config/response.js';
import { healthRoute } from './src/routes/health.js';
import { signupRouter } from './src/routes/signup.js';
import { loginRouter } from './src/routes/login.js';
import { searchRouter } from './src/routes/search.js';
import { refreshTokenRouter } from './src/routes/refreshToken.js';
import sizeUploadRoutes from './src/routes/uploadsize.routes.js';

dotenv.config();

// require('dotenv').config(); 
const app = express();
app.set('port', process.env.PORT || 3000);

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

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use("/health", healthRoute);
app.use("/FITple/signup",signupRouter);
app.use("/FITple/login",loginRouter);
app.use('/FITple/search', searchRouter);
app.use('/FITple/uploadsize', sizeUploadRoutes);
app.use("/FITple/refreshToken",refreshTokenRouter);


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

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}`);
});