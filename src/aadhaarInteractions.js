import * as IPFS from 'ipfs-http-client';
import { TextEncoder } from 'text-encoding';

const { web3, aadhaarContract } = require('./ethereumSetup')
const ipfs = IPFS.create({ host: '127.0.0.1', port: 5001, protocol: 'http' });

// add id and CID to blockchain
async function addAadhaarIDToBlockchain(ipfsCID, id){
    const accounts = await web3.eth.getAccounts()
    await aadhaarContract.methods.registerAadhaar(id, ipfsCID).send({ from: accounts[0], gas: 600000})
}

// retrieve cid from blockchain
async function retrieveAadhaarCIDFromBLockchain(id){
    const result = await aadhaarContract.methods.getAadhaar(id).call();
    return result;
}

// add Aadhaar data to IPFS
async function addAadhaarDataToIPFS(data){
    const encodeData = new TextEncoder().encode(data);
    const result = await ipfs.add(encodeData);
    return result.cid.toString();
}

// retrieve Aadhaar data from IPFS
async function retrieveAadhaarDataFromIPFS(cid){
    const result = await ipfs.cat(cid);
    const textDecoder = new TextDecoder();

    let content = '';
    for await (const chunk of result){
        content += textDecoder.decode(chunk, {stream: true});
    }

    content += textDecoder.decode();
    return content;
}

export { addAadhaarIDToBlockchain, retrieveAadhaarCIDFromBLockchain, addAadhaarDataToIPFS, retrieveAadhaarDataFromIPFS };
