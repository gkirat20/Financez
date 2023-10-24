pragma solidity >=0.4.22 <0.7.0;

contract DataAsset {

    // Define a new role identifier for our app
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Struct to represent a data asset
    struct Data {
        string metadata;
        uint256 price;
        address payable owner;
        bool isSold;
        bool isListed;
    }

    // Add this at the beginning of your contract
    struct Auction {
        uint256 startPrice;
        uint256 endTime;
        address payable highestBidder;
        uint256 highestBid;
        bool active;
    }

    // Mapping from data ID to Data struct
    mapping(uint256 => Data) public dataAssets;
    uint256 public dataCounter = 0;

    // Mapping to track pending withdrawals
    mapping(address => uint256) public pendingWithdrawals;

    mapping(uint256 => Auction) public dataAuctions;

    // Events
    event DataListed(uint256 indexed dataId, address indexed owner, uint256 price);
    event DataPurchased(uint256 indexed dataId, address indexed buyer, address indexed seller, uint256 price);
    event PriceUpdated(uint256 indexed dataId, uint256 newPrice);
    event ListingCancelled(uint256 indexed dataId);
    event OwnershipTransferred(uint256 indexed dataId, address indexed previousOwner, address indexed newOwner);
    
    event AuctionStarted(uint256 indexed dataId, uint256 startTime, uint256 endTime);
    event NewBid(uint256 indexed dataId, address indexed bidder, uint256 amount);

    function startAuction(uint256 _dataId, uint256 _startPrice, uint256 _duration) external {
        require(dataAssets[_dataId].owner == msg.sender, "Only the owner can start the auction");
        Auction memory newAuction = Auction(_startPrice, block.timestamp + _duration, address(0), 0, true);
        dataAuctions[_dataId] = newAuction;
        emit AuctionStarted(_dataId, block.timestamp, block.timestamp + _duration);
    }

    function bid(uint256 _dataId) external payable {
        require(dataAuctions[_dataId].active, "Auction not active");
        require(block.timestamp <= dataAuctions[_dataId].endTime, "Auction ended");
        require(msg.value > dataAuctions[_dataId].highestBid, "Bid too low");

        if (dataAuctions[_dataId].highestBidder != address(0)) {
            pendingWithdrawals[dataAuctions[_dataId].highestBidder] += dataAuctions[_dataId].highestBid;  // Refund the previous highest bidder
        }

        dataAuctions[_dataId].highestBidder = msg.sender;
        dataAuctions[_dataId].highestBid = msg.value;
        emit NewBid(_dataId, msg.sender, msg.value);
    }

    function endAuction(uint256 _dataId) external {
        require(block.timestamp > dataAuctions[_dataId].endTime, "Auction not yet ended");
        require(dataAuctions[_dataId].active, "Auction already ended");

        dataAuctions[_dataId].active = false;
        pendingWithdrawals[dataAssets[_dataId].owner] += dataAuctions[_dataId].highestBid;  // Add funds to the owner's withdrawals

        dataAssets[_dataId].owner = dataAuctions[_dataId].highestBidder;
        emit OwnershipTransferred(_dataId, dataAssets[_dataId].owner, dataAuctions[_dataId].highestBidder);
    }
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