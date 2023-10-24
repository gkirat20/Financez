const DataAsset = artifacts.require("DataAsset");

contract("DataAsset", (accounts) => {

    let instance;
    const owner = accounts[0];
    const buyer = accounts[1];
    const listedPrice = web3.utils.toWei("1", "ether");  // Setting the listed price as 1 ether for example

    beforeEach(async () => {
        instance = await DataAsset.new();

        // List a data asset for sale before each test
        await instance.listData("Test Data", listedPrice, { from: owner });
    });

    it("should list data for sale", async () => {
        const metadata = "Another Test Data";
        const price = web3.utils.toWei("2", "ether");  // Different price for this test

        const result = await instance.listData(metadata, price, { from: owner });

        // Checking the event
        assert.equal(result.logs[0].event, "DataListed");
        assert.equal(result.logs[0].args.dataId.toNumber(), 2);  // This will be the second data listed
        assert.equal(result.logs[0].args.owner, owner);
        assert.equal(result.logs[0].args.price, price);

        // Checking the data in the contract
        const data = await instance.dataAssets(2);
        assert.equal(data.metadata, metadata);
        assert.equal(data.price, price);
        assert.equal(data.owner, owner);
        assert.equal(data.isSold, false);
        assert.equal(data.isListed, true);
    });

    it("should allow a buyer to purchase a data asset", async () => {
        await instance.purchaseData(1, {from: buyer, value: listedPrice});
    
        const data = await instance.dataAssets(1);
        assert.equal(data.isSold, true, "Data was not marked as sold.");
        assert.equal(data.isListed, false, "Data was not removed from listing.");
    });
    
    it("should accumulate the correct amount for the owner after purchase", async () => {
        await instance.purchaseData(1, {from: buyer, value: listedPrice});
    
        const balance = await instance.pendingWithdrawals(owner);
        assert.equal(balance.toString(), listedPrice, "Balance after purchase is incorrect.");
    });
    
    it("should allow owner to withdraw funds after sale", async () => {
        await instance.purchaseData(1, {from: buyer, value: listedPrice});
    
        const initialBalance = await web3.eth.getBalance(owner);
        await instance.withdrawFunds({from: owner});
        const finalBalance = await web3.eth.getBalance(owner);
    
        assert(
            web3.utils.toBN(finalBalance).gt(web3.utils.toBN(initialBalance)),
            "Owner's balance was not increased after withdrawal."
        );
    });
    
    it("should reset pending withdrawals after the owner withdraws", async () => {
        await instance.purchaseData(1, {from: buyer, value: listedPrice});
        await instance.withdrawFunds({from: owner});
    
        const balanceAfterWithdrawal = await instance.pendingWithdrawals(owner);
        assert.equal(balanceAfterWithdrawal.toString(), "0", "Pending withdrawals was not reset to 0.");
    });
    
    
    it("should allow the owner to update the price", async () => {
        const metadata = "Test Data";
        const price = web3.utils.toWei("1", "ether");
    
        await instance.listData(metadata, price, { from: owner });
    
        // Update the price
        const newPrice = web3.utils.toWei("2", "ether");
        const result = await instance.updatePrice(1, newPrice, { from: owner });
    
        // Checking the event
        assert.equal(result.logs[0].event, "PriceUpdated");
        assert.equal(result.logs[0].args.dataId.toNumber(), 1);
        assert.equal(result.logs[0].args.newPrice, newPrice);
    
        // Checking the new price in the contract
        const data = await instance.dataAssets(1);
        assert.equal(data.price, newPrice);
    });

    it("should allow the owner to cancel a data listing", async () => {
        // List a new data asset for this test
        const metadata = "Cancelable Test Data";
        const price = web3.utils.toWei("1.5", "ether");
        await instance.listData(metadata, price, { from: owner });
    
        // Retrieve the owner of the latest data asset
        const latestDataId = (await instance.dataCounter()).toNumber();
        const dataAssetOwner = (await instance.dataAssets(latestDataId)).owner;
        console.log("DataAsset Owner:", dataAssetOwner);
        console.log("Test Owner:", owner);
    
        // Cancel the listing
        const result = await instance.cancelListing(latestDataId, { from: owner });
    
        // Checking the event
        assert.equal(result.logs[0].event, "ListingCancelled");
        assert.equal(result.logs[0].args.dataId.toNumber(), latestDataId);
    
        // Check the data in the contract
        const data = await instance.dataAssets(latestDataId);
        assert.equal(data.isListed, false, "Data was not removed from listing.");
    });
    
    it("should allow the owner to transfer ownership of a data asset", async () => {
        // List a new data asset for this test
        const metadata = "Transferable Test Data";
        const price = web3.utils.toWei("2", "ether");
        await instance.listData(metadata, price, { from: owner });
    
        // Define a new owner
        const newOwner = accounts[1];
    
        // Retrieve the latest data asset's ID
        const latestDataId = (await instance.dataCounter()).toNumber();
    
        // Transfer the ownership
        const result = await instance.transferOwnership(latestDataId, newOwner, { from: owner });
    
        // Checking the event
        assert.equal(result.logs[0].event, "OwnershipTransferred");
        assert.equal(result.logs[0].args.dataId.toNumber(), latestDataId);
        assert.equal(result.logs[0].args.previousOwner, owner);
        assert.equal(result.logs[0].args.newOwner, newOwner);
    
        // Verify the new owner in the contract
        const data = await instance.dataAssets(latestDataId);
        assert.equal(data.owner, newOwner, "Ownership was not transferred.");
    });
    
    it("should allow the owner to start an auction for a data asset", async () => {
        const startPrice = web3.utils.toWei("0.5", "ether");
        const duration = 3600;  // 1 hour in seconds
    
        const result = await instance.startAuction(1, startPrice, duration, { from: owner });
    
        assert.equal(result.logs[0].event, "AuctionStarted");
        const auction = await instance.dataAuctions(1);
        assert.equal(auction.startPrice, startPrice);
        assert.equal(auction.active, true);
    });
    
    it("should allow users to bid in the auction", async () => {
        const startPrice = web3.utils.toWei("0.5", "ether");
        const duration = 3600;  // 1 hour in seconds
        await instance.startAuction(1, startPrice, duration, { from: owner });
    
        const bidAmount = web3.utils.toWei("1", "ether");
        const result = await instance.bid(1, { from: buyer, value: bidAmount });
    
        assert.equal(result.logs[0].event, "NewBid");
        const auction = await instance.dataAuctions(1);
        assert.equal(auction.highestBidder, buyer);
        assert.equal(auction.highestBid.toString(), bidAmount);
    });
    
    it("should allow the owner to end the auction and transfer ownership", async () => {
        const startPrice = web3.utils.toWei("0.5", "ether");
        const shortDuration = 1;  // 1 second for testing
        await instance.startAuction(1, startPrice, shortDuration, { from: owner });
        
        // Wait for 2 seconds to ensure the auction can be ended
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        const result = await instance.endAuction(1, { from: owner });
        assert.equal(result.logs[0].event, "OwnershipTransferred");
    
        const auction = await instance.dataAuctions(1);
        assert.equal(auction.active, false);
    });
    

});

