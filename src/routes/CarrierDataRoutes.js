import express from 'express';
import { processCarrierData } from '../controllers/CarrierDataController.js';

const router = express.Router();

router.post('/api/dados', processCarrierData);

export default router;
