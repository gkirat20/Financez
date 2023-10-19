const express = require('express');
const router = express.Router();
const dataInsightsController = require('../controllers/dataInsightsController');

router.get('/', dataInsightsController.getAllDataInsights);
router.get('/:id', dataInsightsController.getDataInsightById);
router.post('/', dataInsightsController.createDataInsight);
router.put('/:id', dataInsightsController.updateDataInsight);
router.delete('/:id', dataInsightsController.deleteDataInsight);

module.exports = router;
