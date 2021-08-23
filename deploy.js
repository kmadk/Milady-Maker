'use strict';

// Imports.
const hre = require('hardhat');
const ethers = hre.ethers;

// Configuration for this deployment.
const options = { gasLimit: ethers.BigNumber.from(6000000), gasPrice: ethers.utils.parseEther('0.000000005') };
const COLLECTION_NAME = 'Milady';
const COLLECTION_SYMBOL = 'MIL';
const METADATA_URI = 'https://astrofrens-metadata.s3.amazonaws.com/AstroFrens/{id}.json';

// Log the gas cost of a transaction.
async function logTransactionGas (transaction) {
    let transactionReceipt = await transaction.wait();
    let transactionGasCost = transactionReceipt.gasUsed;
    console.log(` -> Gas cost: ${transactionGasCost.toString()}`);
    return transactionGasCost;
}

// Deploy using an Ethers signer to a network.
async function main () {
    const signers = await ethers.getSigners();
    const addresses = await Promise.all(signers.map(async signer => signer.getAddress()));
    const deployer = { provider: signers[0].provider, signer: signers[0], address: addresses[0] };
    console.log(`Deploying contracts from: ${deployer.address}`);

    // Create a variable to track the total gas cost of deployment.
    let totalGasCost = ethers.utils.parseEther('0');

    // Retrieve contract artifacts and deploy them.
    const Milady = await ethers.getContractFactory('Miladys');

    // Deploy the item collection.
    console.log(` -> Deploying the item collection ...`);
    let miladyContract = await Milady.connect(deployer.signer).deploy(deployer.address, COLLECTION_NAME, COLLECTION_SYMBOL);
    let miladyContractDeploy = await itemCollection.deployed();
    console.log(`* Milady contract deployed to: ${miladyContract.address}`);
    totalGasCost = totalGasCost.add(await logTransactionGas(miladyContractDeploy.deployTransaction));

    // Verify the smart contract on Etherscan.
    console.log(`[$]: npx hardhat verify --network rinkeby ${miladyContract.address} ${deployer.address} ${COLLECTION_NAME} ${COLLECTION_SYMBOL}`);

    /* Create the bull item group.
    console.log(` -> Creating the Astro Bull item group ...`);
    let bullCreationTransaction = await itemCollection.connect(deployer.signer).configureGroup(1, {
        name: 'Astro Bulls',
        supplyType: 0,
        supplyData: 10000,
        itemType: 0,
        itemData: 0,
        burnType: 1,
        burnData: 10000
    }, options);
    totalGasCost = totalGasCost.add(await logTransactionGas(bullCreationTransaction));
    
    // Output the final gas cost.
    console.log('');
    console.log(`=> Final gas cost of deployment: ${totalGasCost.toString()}`);
    */
} 

// Execute the script and catch errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
