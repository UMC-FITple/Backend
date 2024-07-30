import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: '핏플 API',
            version: '0.0.1',
            description: '핏플 API with express, API 설명'
        },
        host: 'localhost:3000/FITPLE',
        basepath: '../'
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);