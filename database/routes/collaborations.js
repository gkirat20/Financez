const express = require('express');
const router = express.Router();
const dataListingsController = require('../controllers/dataListingsController');

router.get('/', dataListingsController.getAllDataListings);
router.get('/:id', dataListingsController.getDataListingById);
router.post('/', dataListingsController.createDataListing);
router.put('/:id', dataListingsController.updateDataListing);
router.delete('/:id', dataListingsController.deleteDataListing);

module.exports = router;
