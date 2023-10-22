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
}