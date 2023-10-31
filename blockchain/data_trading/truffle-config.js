require('dotenv').config(); // at the top of your truffle-config.js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "a7b4fad1622c4be3891fe5dce5677e13";

// Use process.env to access the environment variable
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
      network_id: 5,       // Goerli's network id
      gas: 5500000,        // Gas limit - How much gas is allowed for the deployment
      confirmations: 2,    // Number of confirmations to wait between deployments (the higher the more secure)
      timeoutBlocks: 200,  // Number of blocks before a deployment times out
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
    },
  },
  develop: {
    port: 8545
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
