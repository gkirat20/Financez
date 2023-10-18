// controllers/transactionController.js
const { Transaction } = require('../relationships');

async function createTransaction(transactionData) {
    return await Transaction.create(transactionData);
}

async function getTransactionById(id) {
    return await Transaction.findByPk(id);
}

async function updateTransaction(id, updatedData) {
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
        await transaction.update(updatedData);
        return transaction;
    }
    return null;
}

async function deleteTransaction(id) {
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
        await transaction.destroy();
        return true;
    }
    return false;
}

async function getAllTransactions() {
    return await Transaction.findAll();
}

module.exports = {
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getAllTransactions
};
