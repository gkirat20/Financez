const Web3 = require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/a7b4fad1622c4be3891fe5dce5677e13');

const contractABI = [
    {
      anonymous: false,
      inputs: [ [Object], [Object], [Object] ],
      name: 'AuctionStarted',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object], [Object], [Object] ],
      name: 'DataListed',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object], [Object], [Object], [Object] ],
      name: 'DataPurchased',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object] ],
      name: 'ListingCancelled',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object], [Object], [Object] ],
      name: 'NewBid',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object], [Object], [Object] ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [ [Object], [Object] ],
      name: 'PriceUpdated',
      type: 'event'
    },
    {
      constant: true,
      inputs: [],
      name: 'ADMIN_ROLE',
      outputs: [ [Object] ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [ [Object] ],
      name: 'dataAssets',
      outputs: [ [Object], [Object], [Object], [Object], [Object] ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [ [Object] ],
      name: 'dataAuctions',
      outputs: [ [Object], [Object], [Object], [Object], [Object] ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'dataCounter',
      outputs: [ [Object] ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [ [Object] ],
      name: 'pendingWithdrawals',
      outputs: [ [Object] ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object], [Object], [Object] ],
      name: 'startAuction',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object] ],
      name: 'bid',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object] ],
      name: 'endAuction',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object], [Object] ],
      name: 'listData',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object] ],
      name: 'purchaseData',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'withdrawFunds',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object], [Object] ],
      name: 'updatePrice',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object] ],
      name: 'cancelListing',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [ [Object], [Object] ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]; // Your contract's ABI
const contractAddress = '0xc49B60344B249658117D58E28B065a93F015C0FB'; // Your contract's address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to list data
const listData = async (metadata, price, fromAddress) => {
  const receipt = await contract.methods.listData(metadata, price).send({ from: fromAddress });
  return receipt;
};

// Function to purchase data
const purchaseData = async (dataId, fromAddress, value) => {
  const receipt = await contract.methods.purchaseData(dataId).send({ from: fromAddress, value: value });
  return receipt;
};

// Function to start an auction
const startAuction = async (dataId, startPrice, duration, fromAddress) => {
  const receipt = await contract.methods.startAuction(dataId, startPrice, duration).send({ from: fromAddress });
  return receipt;
};

// Function to place a bid
const bid = async (dataId, amount, fromAddress) => {
  const receipt = await contract.methods.bid(dataId).send({ from: fromAddress, value: amount });
  return receipt;
};

// Function to end an auction
const endAuction = async (dataId, fromAddress) => {
  const receipt = await contract.methods.endAuction(dataId).send({ from: fromAddress });
  return receipt;
};

// Function to withdraw funds
const withdrawFunds = async (fromAddress) => {
  const receipt = await contract.methods.withdrawFunds().send({ from: fromAddress });
  return receipt;
};

// Function to update the price of a listed data asset
const updatePrice = async (dataId, newPrice, fromAddress) => {
  const receipt = await contract.methods.updatePrice(dataId, newPrice).send({ from: fromAddress });
  return receipt;
};

// Function to cancel a data listing
const cancelListing = async (dataId, fromAddress) => {
  const receipt = await contract.methods.cancelListing(dataId).send({ from: fromAddress });
  return receipt;
};

module.exports = {
  listData,
  purchaseData,
  startAuction,
  bid,
  endAuction,
  withdrawFunds,
  updatePrice,
  cancelListing
};
