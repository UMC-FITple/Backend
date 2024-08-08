import SwaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 현재 작업 디렉토리의 경로를 기준으로 설정
const options = {
    definition: {
        info: {
            title: '핏플 API',
            version: '0.0.1',
            description: '핏플 API with express, API 설명'
        },
        servers: [
            {
                url: 'http://localhost:3000/',
                description: 'Local server'
            }
        ]
    },
    apis: [path.join(__dirname, '../src/routes/*.js'), path.join(__dirname, './*.swagger.yaml')]
};

export const specs = SwaggerJsdoc(options);