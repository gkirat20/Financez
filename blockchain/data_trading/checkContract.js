const DataAssetJson = require('./build/contracts/DataAsset.json');

const dataAssetABI = DataAssetJson.abi;

// Assuming you deployed to Goerli testnet with network ID 5
const networkId = '5';
const dataAssetAddress = DataAssetJson.networks[networkId] ? DataAssetJson.networks[networkId].address : 'Not deployed on this network';

console.log("ABI:", dataAssetABI);
console.log("Address:", dataAssetAddress);
