import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import SwaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger.config.js';
import { init } from './db/index.js';
import { signupRouter } from './routes/signup.js';
import { status } from './config/response.status.js';
import { BaseError } from './config/error.js';
import { response } from './config/response.js';

const app = express();
const port = 3000;

await init();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use("/FITple/signup",signupRouter);

app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
  res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});