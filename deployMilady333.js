'use strict';

// Imports.
const hre = require('hardhat');
const ethers = hre.ethers;

// Configuration for this deployment.
const options = { gasLimit: ethers.BigNumber.from(6000000), gasPrice: ethers.utils.parseEther('0.000000005') };
const COLLECTION_NAME = 'Milady333';
const COLLECTION_SYMBOL = 'ML3';
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
    const Milady333 = await ethers.getContractFactory('Miladys333');

    // Deploy the item collection.
    console.log(` -> Deploying the item collection ...`);
    let milady333Contract = await Milady333.connect(deployer.signer).deploy();
    let milady333ContractDeploy = await milady333Contract.deployed();
    console.log(`* Milady333 contract deployed to: ${milady333Contract.address}`);
    totalGasCost = totalGasCost.add(await logTransactionGas(milady333ContractDeploy.deployTransaction));
    // Verify the smart contract on Etherscan.
    console.log(`[$]: npx hardhat verify --network rinkeby ${milady333Contract.address}`);

    //Reserve 12 Miladys.
    console.log(` -> reserving Miladys ...`);
    let reserve = await milady333Contract.connect(deployer.signer).reserveMiladys333();
    totalGasCost = totalGasCost.add(await logTransactionGas(reserve));
    
    // Output the final gas cost.
    console.log('');
    console.log(`=> Final gas cost of deployment: ${totalGasCost.toString()}`);
    
} 

// Execute the script and catch errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
