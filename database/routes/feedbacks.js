const express = require('express');
const router = express.Router();
const feedbacksController = require('../controllers/feedbacksController');

router.get('/', feedbacksController.getAllFeedbacks);
router.get('/:id', feedbacksController.getFeedbackById);
router.post('/', feedbacksController.createFeedback);
router.put('/:id', feedbacksController.updateFeedback);
router.delete('/:id', feedbacksController.deleteFeedback);

module.exports = router;
