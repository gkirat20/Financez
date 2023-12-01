// controllers/dataListingController.js
const { DataListing } = require('../relationships');

const { 
    listData, 
    purchaseData, 
    updatePrice,
    purchaseData,
    cancelListing,
    // Other functions as needed
} = require('/Users/kirat/Desktop/Startup_project_ideas/Financez/Financez/database/blockchain.js');

async function createDataListing(listingData, fromAddress) {
    try {
        // List data on the blockchain
        const blockchainResponse = await listData(listingData.metadata, listingData.price, fromAddress);
        // Add blockchain transaction information to listingData
        listingData.transactionHash = blockchainResponse.transactionHash;
        // Create listing in your database
        return await DataListing.create(listingData);
    } catch (error) {
        // Handle blockchain errors
        throw new Error('Blockchain interaction failed');
    }
}

async function updateDataListing(id, updatedData, fromAddress) {
    const listing = await DataListing.findByPk(id);
    if (listing) {
        try {
            // Update price on the blockchain
            if (updatedData.price) {
                await updatePrice(id, updatedData.price, fromAddress);
            }
            // Update data in your database
            await listing.update(updatedData);
            return listing;
        } catch (error) {
            // Handle blockchain errors
            throw new Error('Blockchain interaction failed');
        }
    }
    return null;
}

async function createDataListing(listingData, fromAddress) {
    try {
        // List data on the blockchain
        const blockchainResponse = await listData(listingData.metadata, listingData.price, fromAddress);
        // Add blockchain transaction information to listingData
        listingData.transactionHash = blockchainResponse.transactionHash;
        // Create listing in your database
        return await DataListing.create(listingData);
    } catch (error) {
        // Handle blockchain errors
        throw new Error('Blockchain interaction failed');
    }
}

async function purchaseDataListing(dataId, fromAddress, value) {
    try {
        // Purchase data on the blockchain
        const blockchainResponse = await purchaseData(dataId, fromAddress, value);
        // Update data in your database
        const listing = await DataListing.findByPk(dataId);
        if (listing) {
            listing.isSold = true;
            await listing.save();
            return { ...listing.toJSON(), transactionHash: blockchainResponse.transactionHash };
        }
        return null;
    } catch (error) {
        // Handle blockchain errors
        throw new Error('Blockchain interaction failed');
    }
}

async function cancelDataListing(dataId, fromAddress) {
    try {
        // Cancel the listing on the blockchain
        const blockchainResponse = await cancelListing(dataId, fromAddress);

        // Update the listing in your database
        const listing = await DataListing.findByPk(dataId);
        if (listing) {
            listing.isListed = false;
            await listing.save();
            return { ...listing.toJSON(), transactionHash: blockchainResponse.transactionHash };
        }
        return null;
    } catch (error) {
        // Handle blockchain and other errors
        console.error('Error canceling data listing:', error);
        throw new Error('Cancellation failed');
    }
}


async function getDataListingById(id) {
    return await DataListing.findByPk(id);
}

async function deleteDataListing(id) {
    const listing = await DataListing.findByPk(id);
    if (listing) {
        await listing.destroy();
        return true;
    }
    return false;
}

async function getAllDataListings() {
    return await DataListing.findAll();
}

module.exports = {
    createDataListing,
    getDataListingById,
    updateDataListing,
    deleteDataListing,
    getAllDataListings,
    purchaseDataListing, 
    cancelDataListing
};