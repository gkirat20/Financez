// controllers/auctionController.js
const { Auction } = require('../relationships'); 
const { startAuction, bid, endAuction } = require('/Users/kirat/Desktop/Startup_project_ideas/Financez/Financez/database/blockchain.js');

async function createAuction(auctionData, fromAddress) {
    try {
        // Start an auction on the blockchain
        const blockchainResponse = await startAuction(auctionData.dataId, auctionData.startPrice, auctionData.duration, fromAddress);
        // Add blockchain transaction information to auctionData
        auctionData.transactionHash = blockchainResponse.transactionHash;
        // Create auction in your database
        return await Auction.create(auctionData);
    } catch (error) {
        console.error('Error starting an auction:', error);
        throw new Error('Blockchain interaction failed');
    }
}

async function placeBid(dataId, amount, fromAddress) {
    try {
        // Place a bid on the blockchain
        const blockchainResponse = await bid(dataId, amount, fromAddress);
        // Update auction in your database with the new bid details
        const auction = await Auction.findOne({ where: { dataId: dataId } });
        if (auction) {
            auction.highestBid = amount;
            auction.highestBidder = fromAddress;
            await auction.save();
            return { ...auction.toJSON(), transactionHash: blockchainResponse.transactionHash };
        }
        return null;
    } catch (error) {
        console.error('Error placing a bid:', error);
        throw new Error('Blockchain interaction failed');
    }
}

async function concludeAuction(dataId, fromAddress) {
    try {
        // End the auction on the blockchain
        const blockchainResponse = await endAuction(dataId, fromAddress);
        // Update auction status in your database
        const auction = await Auction.findOne({ where: { dataId: dataId } });
        if (auction) {
            auction.isActive = false;
            await auction.save();
            return { ...auction.toJSON(), transactionHash: blockchainResponse.transactionHash };
        }
        return null;
    } catch (error) {
        console.error('Error concluding the auction:', error);
        throw new Error('Blockchain interaction failed');
    }
}

module.exports = {
    createAuction,
    placeBid,
    concludeAuction
};
