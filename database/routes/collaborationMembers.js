const express = require('express');
const router = express.Router();
const collaborationMembersController = require('../controllers/collaborationMembersController');

router.get('/', collaborationMembersController.getAllCollaborationMembers);
router.get('/:id', collaborationMembersController.getCollaborationMemberById);
router.post('/', collaborationMembersController.createCollaborationMember);
router.put('/:id', collaborationMembersController.updateCollaborationMember);
router.delete('/:id', collaborationMembersController.deleteCollaborationMember);

module.exports = router;
