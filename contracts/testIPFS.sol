// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract testIPFS {
    struct idIpfs {
        string ipfsCID;
        uint256 id;
    }

    mapping(uint256 => idIpfs) idIpfsDataMap;
    uint256 public idCount;

    event FormSubmitted(string ipfsCID, uint256 id);

    function addFormData(string memory _ipfsCID, uint256 _id) external {
        idIpfs storage ipfsData = idIpfsDataMap[_id];
        ipfsData.ipfsCID = _ipfsCID;
        ipfsData.id = _id;
        idCount++;

        emit FormSubmitted(_ipfsCID, _id);
    }

    function getFormData(uint256 _id) external view returns (string memory) {
        return idIpfsDataMap[_id].ipfsCID;
    }
}
