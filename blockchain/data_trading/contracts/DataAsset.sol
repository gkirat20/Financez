// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataAsset {

    // Struct to represent a data asset
    struct Data {
        string metadata;
        uint256 price;
        address payable owner;
        bool isSold;
        bool isListed;
    }

    // Mapping from data ID to Data struct
    mapping(uint256 => Data) public dataAssets;
    uint256 public dataCounter = 0;

    // Events
    event DataListed(uint256 indexed dataId, address indexed owner, uint256 price);
    event DataPurchased(uint256 indexed dataId, address indexed buyer, address indexed seller, uint256 price);
    event PriceUpdated(uint256 indexed dataId, uint256 newPrice);
    event ListingCancelled(uint256 indexed dataId);
    event OwnershipTransferred(uint256 indexed dataId, address indexed previousOwner, address indexed newOwner);

    // List data for sale
    function listData(string memory _metadata, uint256 _price) external {
        dataCounter++;
        dataAssets[dataCounter] = Data(_metadata, _price, payable(msg.sender), false, true);
        emit DataListed(dataCounter, msg.sender, _price);
    }

    // Purchase data
    function purchaseData(uint256 _dataId) external payable {
        Data storage dataToPurchase = dataAssets[_dataId];

        require(dataToPurchase.isListed, "Data is not listed.");
        require(!dataToPurchase.isSold, "Data is already sold.");
        require(msg.value == dataToPurchase.price, "Incorrect Ether sent.");

        // Accumulate the funds within the contract for the owner
        pendingWithdrawals[dataToPurchase.owner] += msg.value;

        // Update the data's status and owner
        dataToPurchase.isSold = true;
        dataToPurchase.isListed = false;
        dataToPurchase.owner = payable(msg.sender);

        emit DataPurchased(_dataId, msg.sender, dataToPurchase.owner, dataToPurchase.price);
    }

    // Withdraw accumulated funds
    function withdrawFunds() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw.");

        // Zero out the pending refund before sending to prevent reentrancy attacks
        pendingWithdrawals[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to withdraw funds.");
    }

    // Update the price of a listed data asset
    function updatePrice(uint256 _dataId, uint256 _newPrice) external {
        Data storage dataToUpdate = dataAssets[_dataId];

        require(msg.sender == dataToUpdate.owner, "Only the owner can update the price");
        require(!dataToUpdate.isSold, "Cannot update price after sale");
        require(dataToUpdate.isListed, "Data is not listed.");

        dataToUpdate.price = _newPrice;
        emit PriceUpdated(_dataId, _newPrice);
    }

    // Cancel a data listing
    function cancelListing(uint256 _dataId) external {
        Data storage dataToCancel = dataAssets[_dataId];

        require(msg.sender == dataToCancel.owner, "Only the owner can cancel the listing");
        require(!dataToCancel.isSold, "Cannot cancel after sale");
        require(dataToCancel.isListed, "Data is not listed.");

        dataToCancel.isListed = false;
        emit ListingCancelled(_dataId);
    }

    // Transfer ownership of a data asset
    function transferOwnership(uint256 _dataId, address _newOwner) external {
        Data storage dataToTransfer = dataAssets[_dataId];

        require(msg.sender == dataToTransfer.owner, "Only the current owner can transfer ownership");
        require(!dataToTransfer.isSold, "Cannot transfer ownership after sale");

        emit OwnershipTransferred(_dataId, dataToTransfer.owner, _newOwner);
        
        dataToTransfer.owner = payable(_newOwner);
    }
}
