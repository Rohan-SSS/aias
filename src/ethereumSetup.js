import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let testFormContractAddress = '0x9449225ea50fa7695878726c15329D43C3F9cC62';
let testFormContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
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
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
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

let testIPFSContractAddress = '0x4382a8859471046b162863076CF750a1750b2576';
let testIPFSContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsCID",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "FormSubmitted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "idCount",
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
        "internalType": "string",
        "name": "_ipfsCID",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
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
]

let aadhaarContractAddress = '0xFF7374D46af353D661c30a5ab36cA42116Ad8b36';
let aadhaarContractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum aadhaarContract.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "RoleAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum aadhaarContract.Role",
        "name": "role",
        "type": "uint8"
      }
    ],
    "name": "RoleRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "aadhaarId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "IpfsCID",
        "type": "string"
      }
    ],
    "name": "aadhaarRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "aadhaarCount",
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
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "addSupervisor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "removeSupervisor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "addRegistrar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "removeRegistrar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aadhaarId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_IpfsCID",
        "type": "string"
      }
    ],
    "name": "registerAadhaar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aadhaarId",
        "type": "uint256"
      }
    ],
    "name": "getAadhaar",
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
]

const testFormContract = new web3.eth.Contract(testFormContractABI, testFormContractAddress);
const testIPFSContract = new web3.eth.Contract(testIPFSContractABI, testIPFSContractAddress);
const aadhaarContract = new web3.eth.Contract(aadhaarContractABI, aadhaarContractAddress);

export {
  testFormContract,
  testIPFSContract,
  aadhaarContract,
  web3
};

