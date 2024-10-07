import { SwaggerOptions } from 'swagger-ui-express';

const PORT = process.env.PORT || 5000;

const swaggerOptions: SwaggerOptions = {
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

export default swaggerOptions;