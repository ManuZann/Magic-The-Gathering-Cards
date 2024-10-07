"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = process.env.PORT || 5000;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Magic the Gathering API',
            version: '1.0.0',
            description: 'API documentation for Magic the Gathering cards'
        }
    },
    apis: ['./src/routes/*.ts']
};
exports.default = swaggerOptions;
