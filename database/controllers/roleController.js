// controllers/roleController.js
const { Role, AccountRole } = require('../relationships');

// Role CRUD
async function createRole(roleData) {
    return await Role.create(roleData);
}

async function getRoleById(id) {
    return await Role.findByPk(id);
}

async function updateRole(id, updatedData) {
    const role = await Role.findByPk(id);
    if (role) {
        await role.update(updatedData);
        return role;
    }
    return null;
}

async function deleteRole(id) {
    const role = await Role.findByPk(id);
    if (role) {
        await role.destroy();
        return true;
    }
    return false;
}

// AccountRole CRUD
async function assignRoleToAccount(accountRoleId) {
    return await AccountRole.create(accountRoleId);
}

async function removeRoleFromAccount(accountRoleId) {
    const accountRole = await AccountRole.findByPk(accountRoleId);
    if (accountRole) {
        await accountRole.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createRole,
    getRoleById,
    updateRole,
    deleteRole,
    assignRoleToAccount,
    removeRoleFromAccount
};
