const Ethers = require('ethers');
const Miladys = artifacts.require("../contracts/Miladys.sol");
contract('milady', async accounts => {
    let milady = await Miladys.new();
    await milady.reserveMiladys();
    reserveMiladys()
    it.only("should work", async () => {
        await milady.reserveMiladys();

    });
})
