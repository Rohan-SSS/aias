import * as IPFS from 'ipfs-http-client';
import { TextEncoder } from 'text-encoding';

const { web3, testIPFSContract } = require('./ethereumSetup')
const ipfs = IPFS.create({ host: '127.0.0.1', port: 5001, protocol: 'http' });


// add id, cid to blockchain
async function addFormDataToBlockchain(ipfsCID, id) {
  const accounts = await web3.eth.getAccounts()
  await testIPFSContract.methods.addFormData(ipfsCID, id).send({ from: accounts[0], gas: 600000 })
}

// retrieve cid from blockchain
async function retrieveCIDFromBlockchain(id) {
  const result = await testIPFSContract.methods.getFormData(id).call();
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
  const textDecoder = new TextDecoder();

  let content = '';
  for await (const chunk of result) {
    content += textDecoder.decode(chunk, { stream: true });
  }

  content += textDecoder.decode();
  return content;
}

export { addDataToIPFS, addFormDataToBlockchain, retrieveCIDFromBlockchain, retrieveDataFromIPFS };

