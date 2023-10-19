const express = require('express');
const router = express.Router();
const userProfilesController = require('../controllers/userProfilesController');

router.get('/', userProfilesController.getAllUserProfiles);
router.get('/:id', userProfilesController.getUserProfileById);
router.post('/', userProfilesController.createUserProfile);
router.put('/:id', userProfilesController.updateUserProfile);
router.delete('/:id', userProfilesController.deleteUserProfile);

module.exports = router;
