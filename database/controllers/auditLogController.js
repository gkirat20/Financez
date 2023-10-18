// controllers/auditLogController.js
const { AuditLog } = require('../relationships');

async function createLog(logData) {
    return await AuditLog.create(logData);
}

async function getLogById(id) {
    return await AuditLog.findByPk(id);
}

async function deleteLog(id) {
    const log = await AuditLog.findByPk(id);
    if (log) {
        await log.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createLog,
    getLogById,
    deleteLog
};
