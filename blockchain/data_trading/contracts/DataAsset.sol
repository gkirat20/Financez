pragma solidity >=0.4.22 <0.7.0;

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

    // Mapping to track pending withdrawals
    mapping(address => uint256) public pendingWithdrawals;

    // Events
    event DataListed(uint256 indexed dataId, address indexed owner, uint256 price);
    event DataPurchased(uint256 indexed dataId, address indexed buyer, address indexed seller, uint256 price);
    event PriceUpdated(uint256 indexed dataId, uint256 newPrice);
    event ListingCancelled(uint256 indexed dataId);
    event OwnershipTransferred(uint256 indexed dataId, address indexed previousOwner, address indexed newOwner);

    // List data for sale
    function listData(string calldata _metadata, uint256 _price) external {
        dataCounter++;
        dataAssets[dataCounter] = Data(_metadata, _price, msg.sender, false, true);
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

        emit DataPurchased(_dataId, msg.sender, dataToPurchase.owner, dataToPurchase.price);
    }

    // Withdraw accumulated funds
    function withdrawFunds() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds available for withdrawal.");

        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
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

        require(msg.sender == dataToCancel.owner, "Only the owner can cancel the listing.");
        require(dataToCancel.isListed, "Data is not listed.");

        dataToCancel.isListed = false;
        emit ListingCancelled(_dataId);
    }

    // Transfer ownership of a data asset
    function transferOwnership(uint256 _dataId, address payable _newOwner) external {
        Data storage dataToTransfer = dataAssets[_dataId];

        require(msg.sender == dataToTransfer.owner, "Only the current owner can transfer ownership.");

        emit OwnershipTransferred(_dataId, dataToTransfer.owner, _newOwner);
        dataToTransfer.owner = _newOwner;
    }

    



}