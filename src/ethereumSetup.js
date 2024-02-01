import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let testFormContractAddress = '0x9DafB8f094B5c86500dFbdeAD405c993eB833e80';

let testFormContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsCID",
        "type": "string"
      }
    ],
    "name": "FormSubmitted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "formDataCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsCID",
        "type": "string"
      }
    ],
    "name": "addFormData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getFormData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const testFormContract = new web3.eth.Contract(testFormContractABI, testFormContractAddress);

export {
  testFormContract,
  web3
};

