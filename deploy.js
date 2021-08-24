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
    let miladyContract = await Milady.connect(deployer.signer).deploy();
    let miladyContractDeploy = await miladyContract.deployed();
    console.log(`* Milady contract deployed to: ${miladyContract.address}`);
    totalGasCost = totalGasCost.add(await logTransactionGas(miladyContractDeploy.deployTransaction));

    // Verify the smart contract on Etherscan.
    console.log(`[$]: npx hardhat verify --network rinkeby ${miladyContract.address}`);
    const addressArray = [
        '0x0e234bb0b30a0B3132CCc98F0178fA1aaa175028',
        '0x73695e5c6141992C4845c348388f3837EA62F40E',
        '0x3fAd44f892b986263ac69dB971db8Da172185387',
        '0xB520F068a908A1782a543aAcC3847ADB77A04778',
        '0x41e6Dd4ac3Ca30F92A223C2dC26532d72401F01F',
        '0x89588FbEa2c3B5d757A394FC50f6b33aE0fa329B',
        '0xA8E61e09E297FfDF78104e004905006cf1d96495',
        '0x7dE4E994A6780c1C2ca8ac69bb15246d61ed576f',
        '0xda29D9087078f1AdBf10dA0dc4ff772905b5C26A',
        '0xF98B05092DE481379E2b713b2A50F39757355F2c',
        '0x88b503C81A4Fb9C9c5464dd3C6835fC34B2cc85d',
        '0xAA65f742193953DAf7703a5EEAf7406c0F6b9137',
        '0x7d1eba58163671b4b30665fa41acc487a0cd15bc',
        '0x441A60ed0643E7D50D26034a25C36A3522AB7e0E',
        '0x049CB6066A5CD517108E3a469de83FC2c0170aA8',
        '0xe0bb184d1360d418b942dBDFdF0b8012D68aE9f2',
        '0x068baEE003C32D507a64eD7AF700a0aC7074Fa58',
        '0x7a18960043093E89d804A30D5664Ce769cd153A1',
        '0x57EE2ede4d40d7e751c1881be275daE29a2794D9',
        '0xf181Fb5B46df60E8babdB3aD52BbB98fF0bE2B81',
        '0x73ccca7296dfedb88bfd68ceda833d8d79abb35f',
        '0x4dF3d6933c43eF3536902fcfd851970A337156Eb',
        '0x2D2587C30441E682Bc0A6EFaF105a4Fa00363ccd',
        '0xd57Bc71B66aba76369E9B86f06611d27C66DEd3B',
        '0x94651dD003d22B8B6a74EfbdF599a1F324a6d7C4',
        '0x3D7D3Ce2832C5b256DeDEd02B4B04537F7F3BAc2',
        '0x2f17874D7B699f52D41F55E4c6306D34b580B512',
        '0x9bFf070eA85902dE09e1FDa1798E9B805dF2975d',
        '0x56EB97727Cd705B521858cbeF50Ec8209f577BCc',
        '0xDa754c0Db6d130bcc196b7FCD013175F5A42FaF3',
        '0x4Fc83f87639C917A9703F135f4C48a50e54eF8c3',
        '0x02E0b414926C827B18B1f0B9aDBe595ef6ffa080',
        '0x143CcF61de46C3FF1B108F7a4ED08930D764dffe',
        '0x7754564cCcefE946C48810885800ccAd0711791a',
        '0xb2F7b27e02Cb228FC3FC92E477621D92570eF1bb',
        '0x9318cb9C2deA66b7403bB9583f576114e745510F',
        '0x1c4352D63D47E65b837081BdeE5BA7F1D5c7cCdd',
        '0x7d4c4d5380Ca2F9C7A091bb622B80613da7Eae8C',
        '0x7B3C26e2F2eb7Ff5050bF77C8C0ed435D8E7bcB5',
        '0xa9fd776a50b60A1Cf2B872696A9866EceCbE1D3A',
        '0xA6C32c23aa78Cf8F7aB7A6AB391a8f6bc68684e6',
        '0x8951e883285b55a26c62257faaB62062b2603e38',
        '0x7bA977Aa4267DBCd7f37c1249F963dFfB532BA79',
        '0xD3775017a04a3FF7999b5CFf7b475Da8919E5484',
        '0xe3eBe57432516419d0Ccf08B71868539ba26eED7',
        '0x540e8ea94360a9360436Ff03b2B6E0033a015F3F',
        '0x4f525903D8d0B2309AB4990534dd44995Aab75C8',
        '0xAe9Ab5f9459A6793Df0d0FBd20485ab4154D6E3C',
        '0x74B624492425F6c54820f8277860feAEF381554b',
        '0xA9D152F80F5e35c96d433b7E05f3dE7F4959DAff',
        '0xdea8984c6540d47aEbb93DC8E9B11a24D2dabeb9',
        '0xc4f7dDF70e470A560D53810Ab87bcAd7E110a2D6',
        '0x84A7b031d90b7D50F1c49bB0b6379B4306Cd8A51',
        '0x5B97788AE0435EEF0bf4a90c9E3d1FD6934eA7C7',
        '0xa9Dd25F75438b141388A462083fdFaf3992d614a',
        '0x66c86a752ee9a5daeb65a56125ccdbaf514bc588',
        '0x996C9FAb1eEcFEA6865E4287Db97B5a136f68F50',
        '0x7c37aBfB5C29b3739a01EFC8B431eCB1d3f0d766',
        '0x2Dfa4cCDBb25ADe0a1ac019A745e31e8CBA68b6A',
        '0x95B97AaA76fC57DCd65df419C6ccd73efaE611ad',
        '0x5E30C99A4c6219A6Ad97a6f0Ff0214E72fa80C90',
        '0x2543Fa7E0932371B7f723eEDe5B2C1f756d120CD',
        '0x78a219cbAdCfD9916953A1C02B815303A0bA4EE4',
        '0x674D341C86cc18694c89675C9794592Bf049ea04',
        '0xc569d4130b68F3BD1Ef7C516f642bEB5415f096f',
        '0xcbC44e0850FA7819184Bfe379BC46f3c84fCf468',
        '0x28B50F9A4520cD07670DAfd300be37bEf0D1C3e8',
        '0xD0C9A560EA86af18174b76Bc5c13a973C52DAc6a',
        '0x952B0C9Af8f8AA7C11E51384a9ec39500a9A17B1',
        '0xa0e80BBC6B49369C5bCf436d7CE726F592e6e14b',
        '0x61c888e1AEB86420D7cCB15705Fa192D19FBf363',
        '0x00859b3baaC525143BB8A3ee3e19DDf9Daf2408c',
        '0x2533897297546cdf565146bD4b9275Ef4469635C',
        '0x30157d4E051F543dfD5879e00a9C381307C730ff',
        '0x6c4d637c3BDf7f097d4f633AD520B560aC3833c0',
        '0x35B689d01277Af423FEda1DE1d3A0Cd4a88EE17E',
        '0x5FDccc192C33849Edf1E6F42558bCCF67495505a',
        '0x9a6C0aA8f0Fd4a3282cfAcD352Ce4f998D7ef466',
        '0x84EEb7dB3f93feb5A8A98F56Dabb970A6797c187',
        '0xD3973E54C4f14B7705f07504d3ea744eDDdAef4a',
        '0x5FB8b9512684d451D4E585A1a0AabFB48A253C67',
        '0x1c6E16F3f328abAd008dd573BecD8EA6Bef4CDAa',
        '0x638856111898B377D3eD7D59975400f00588dC65',
        '0x7C3db7eeE60FAD212D6BBcd256FAC8782a21b5fF',
        '0x03A101901BaFA5d179aDa227B3fC2c3CEc4cE000',
        '0xf983557ec70fbf1a4b1e247af7bf10247e9b69c4',
        '0x67BA6765d6a3241039a32dF86F28E7db73C717b3',
        '0xe525B178F1BC9c8907AFae4868F0AA74418Fa34e',
        '0x964D71Fa3814f2eA30315a112F5E9E57Ff0E0b2A',
        '0x57895e33d900635De0aDb0E57855a11DE008B4C1',
        '0x51F6f25684397FBccCd96F103777b5371de23ee7',
        '0x05603561a53de107Ce513fE12ED0B13Cc0Da4ed2',
        '0xe4446D52e2bdB3E31470643Ab1753a4c2aEee3eA',
        '0x996C9FAb1eEcFEA6865E4287Db97B5a136f68F50',
        '0xFDE83f9ACA7900A39e628f4E567DeE288BB18C7E',
        '0xE31985f594ea0199a64e5d3a667cA886Ed8fD382',
        '0x308FDcAC94C499c323530F7d6154A8a8732786EC',
        '0xDa1E6ba84dd73373107a7e2eEB930Ea4c0775FC7',
        '0xdE76e76454afB5438c9cC3927e797FeD803eC166',
        '0x07dadde841ca7aca8b313ef7a1b1998ab567cfc5',
        '0x87f1e13435B9Bcd1172D62b611CFC21264989Ff1',
        '0x361CC8924bdBdA989f04FC96154317c9cEed5e9B',
        '0x1594D95e78CC2BC68bAd79aE92F91D9B729FACE2',
        '0xF7F0Aee3E96eA41D01a7bDfA7c08CDC692F2c413'
    ];
    console.log("addressArrayLength: " + addressArray.length)
    //Create the whitelist.
    console.log(` -> Adding to whitelist ...`);
    let whitelist = await miladyContract.connect(deployer.signer).editWhitelistTwo(addressArray);
    totalGasCost = totalGasCost.add(await logTransactionGas(whitelist));
    
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
