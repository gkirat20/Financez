// controllers/feedbackController.js
const { Feedback } = require('../relationships');

async function createFeedback(feedbackData) {
    return await Feedback.create(feedbackData);
}

async function getFeedbackById(id) {
    return await Feedback.findByPk(id);
}

async function updateFeedback(id, updatedData) {
    const feedback = await Feedback.findByPk(id);
    if (feedback) {
        await feedback.update(updatedData);
        return feedback;
    }
    return null;
}

async function deleteFeedback(id) {
    const feedback = await Feedback.findByPk(id);
    if (feedback) {
        await feedback.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};
