// controllers/userProfileController.js
const { UserProfile } = require('../relationships');

async function createUserProfile(profileData) {
    return await UserProfile.create(profileData);
}

async function getUserProfileByAccountId(accountId) {
    return await UserProfile.findOne({ where: { account_id: accountId } });
}

async function updateUserProfile(accountId, updatedData) {
    const profile = await UserProfile.findOne({ where: { account_id: accountId } });
    if (profile) {
        await profile.update(updatedData);
        return profile;
    }
    return null;
}

async function deleteUserProfile(accountId) {
    const profile = await UserProfile.findOne({ where: { account_id: accountId } });
    if (profile) {
        await profile.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createUserProfile,
    getUserProfileByAccountId,
    updateUserProfile,
    deleteUserProfile
};
