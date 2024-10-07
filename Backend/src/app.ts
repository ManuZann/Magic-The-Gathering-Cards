import express from 'express';
import connectDB from './database';
import dotenv from 'dotenv';
import cardRouter from './routes/cards.routes';
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import swaggerOptions from './swaggerOptions';
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());

app.use(express.json());

app.use('/api/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});