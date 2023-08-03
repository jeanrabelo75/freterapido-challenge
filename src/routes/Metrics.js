import express from 'express';
import CarrierDataModel from '../models/CarrierData.js';

const router = express.Router();

router.get('/metrics', async (req, res) => {
  try {
    const { last_quotes } = req.query;

    const pipeline = [
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
          totalPrice: { $sum: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
          totalPrice: 1,
          avgPrice: { $divide: ['$totalPrice', '$count'] },
          minPrice: 1,
          maxPrice: 1,
        },
      },
    ];

    if (last_quotes) {
      pipeline.push({ $limit: parseInt(last_quotes) });
    }

    const results = await CarrierDataModel.aggregate(pipeline);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving metrics' });
  }
});

export default router;
