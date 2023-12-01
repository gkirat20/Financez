// controllers/transactionController.js

const { withdrawFunds } = require('/Users/kirat/Desktop/Startup_project_ideas/Financez/Financez/database/blockchain.js');
const Account = require('../relationships'); // Assuming you have an Account model

const { Transaction } = require('../relationships');

async function withdrawUserFunds(userId, fromAddress, withdrawalAmount) {
    try {
        // Validate user and check balance
        const userAccount = await Account.findByPk(userId);
        if (!userAccount) {
            throw new Error('User account not found');
        }

        if (userAccount.balance < withdrawalAmount) {
            throw new Error('Insufficient balance for withdrawal');
        }

        // Withdraw funds from the blockchain
        const receipt = await withdrawFunds(fromAddress);

        // Update user's balance in your database
        userAccount.balance -= withdrawalAmount; // Deduct the withdrawal amount
        await userAccount.save();

        // Log this transaction in your database
        const newTransaction = await Transaction.create({
            userId,
            type: 'Withdrawal',
            amount: withdrawalAmount,
            transactionHash: receipt.transactionHash
        });

        return newTransaction;
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        throw error;
    }
}

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
    getAllTransactions,
    withdrawUserFunds
};
