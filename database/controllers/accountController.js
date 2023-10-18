// controllers/accountController.js
const { Account } = require('../relationships');

async function createAccount(accountData) {
    return await Account.create(accountData);
}

async function getAccountById(id) {
    return await Account.findByPk(id);
}

async function updateAccount(id, updatedData) {
    const account = await Account.findByPk(id);
    if (account) {
        await account.update(updatedData);
        return account;
    }
    return null;
}

async function deleteAccount(id) {
    const account = await Account.findByPk(id);
    if (account) {
        await account.destroy();
        return true;
    }
    return false;
}

async function getAllAccounts() {
    return await Account.findAll();
}

module.exports = {
    createAccount,
    getAccountById,
    updateAccount,
    deleteAccount,
    getAllAccounts
};
