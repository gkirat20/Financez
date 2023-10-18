// controllers/collaborationController.js
const { Collaboration, CollaborationMember } = require('../relationships');

// Collaboration CRUD
async function createCollaboration(collabData) {
    return await Collaboration.create(collabData);
}

async function getCollaborationById(id) {
    return await Collaboration.findByPk(id);
}

async function updateCollaboration(id, updatedData) {
    const collab = await Collaboration.findByPk(id);
    if (collab) {
        await collab.update(updatedData);
        return collab;
    }
    return null;
}

async function deleteCollaboration(id) {
    const collab = await Collaboration.findByPk(id);
    if (collab) {
        await collab.destroy();
        return true;
    }
    return false;
}

// CollaborationMember CRUD
async function addMemberToCollaboration(memberData) {
    return await CollaborationMember.create(memberData);
}

async function removeMemberFromCollaboration(memberId) {
    const member = await CollaborationMember.findByPk(memberId);
    if (member) {
        await member.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createCollaboration,
    getCollaborationById,
    updateCollaboration,
    deleteCollaboration,
    addMemberToCollaboration,
    removeMemberFromCollaboration
};
