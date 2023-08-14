import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import metricsRouter from './src/routes/Metrics.js';
import carrierDataRoutes from './src/routes/CarrierDataRoutes.js';
import { errorMiddleware } from './src/middlewares/ErrorMiddleware.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const port = 3000;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully.');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`FreteRápido Challenge is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Desafio de Backend para Frete Rápido');
});

app.use(carrierDataRoutes);
app.use('/api', metricsRouter);
app.use(errorMiddleware);
