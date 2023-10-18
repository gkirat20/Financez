// controllers/dataInsightController.js
const { DataInsight } = require('../relationships');

async function createInsight(insightData) {
    return await DataInsight.create(insightData);
}

async function getInsightById(id) {
    return await DataInsight.findByPk(id);
}

async function updateInsight(id, updatedData) {
    const insight = await DataInsight.findByPk(id);
    if (insight) {
        await insight.update(updatedData);
        return insight;
    }
    return null;
}

async function deleteInsight(id) {
    const insight = await DataInsight.findByPk(id);
    if (insight) {
        await insight.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createInsight,
    getInsightById,
    updateInsight,
    deleteInsight
};
