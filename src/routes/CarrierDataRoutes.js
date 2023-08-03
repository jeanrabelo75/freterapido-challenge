import express from 'express';
import CarrierDataController from '../controllers/CarrierDataController.js';

const router = express.Router();

router.post('/api/dados', CarrierDataController.processData);

export default router;
