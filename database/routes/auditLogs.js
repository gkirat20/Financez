const express = require('express');
const router = express.Router();
const auditLogsController = require('../controllers/auditLogsController');

router.get('/', auditLogsController.getAllAuditLogs);
router.get('/:id', auditLogsController.getAuditLogById);
router.post('/', auditLogsController.createAuditLog);
router.put('/:id', auditLogsController.updateAuditLog);
router.delete('/:id', auditLogsController.deleteAuditLog);

module.exports = router;
