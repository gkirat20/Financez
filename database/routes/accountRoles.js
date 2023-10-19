const express = require('express');
const router = express.Router();
const accountRolesController = require('../controllers/accountRolesController');

router.get('/', accountRolesController.getAllAccountRoles);
router.get('/:id', accountRolesController.getAccountRoleById);
router.post('/', accountRolesController.createAccountRole);
router.put('/:id', accountRolesController.updateAccountRole);
router.delete('/:id', accountRolesController.deleteAccountRole);

module.exports = router;
