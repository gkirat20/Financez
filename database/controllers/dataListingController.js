// controllers/dataListingController.js
const { DataListing } = require('../relationships');

async function createDataListing(listingData) {
    return await DataListing.create(listingData);
}

async function getDataListingById(id) {
    return await DataListing.findByPk(id);
}

async function updateDataListing(id, updatedData) {
    const listing = await DataListing.findByPk(id);
    if (listing) {
        await listing.update(updatedData);
        return listing;
    }
    return null;
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
    getAllDataListings
};
