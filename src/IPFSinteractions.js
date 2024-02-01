import * as IPFS from 'ipfs-http-client';
import { TextDecoder, TextEncoder } from 'text-encoding';

const { web3, testFormContract } = require('./ethereumSetup')
const ipfs = IPFS.create({ host: '127.0.0.1', port: 5001, protocol: 'http' });


// add id, cid to blockchain
async function addFormDataToBlockchain(id, ipfsCID) {
  const accounts = await web3.eth.getAccounts()
  await testFormContract.methods.addFormData(id, ipfsCID).send({ from: accounts[0], gas: 600000 })
}

// retrieve cid from blockchain
async function retrieveCIDFromBlockchain(id) {
  const result = await testFormContract.methods.getFormData(id).call();
  return result
}

// add data to ipfs
async function addDataToIPFS(data) {
  const encodedData = new TextEncoder().encode(data);
  const result = await ipfs.add(encodedData);
  return result.cid.toString();
}

// retrieve data from ipfs
async function retrieveDataFromIPFS(cid) {
  const result = await ipfs.cat(cid);
  const decodedData = new TextDecoder().decode(result);
  return decodedData;
}

export { addDataToIPFS, addFormDataToBlockchain, retrieveCIDFromBlockchain, retrieveDataFromIPFS };

