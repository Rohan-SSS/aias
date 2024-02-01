// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract TestForm {
    struct FormData {
        uint256 id;
        string ipfsCID;
    }

    mapping(uint256 => FormData) formDataMap;
    uint256 public formDataCount;

    event FormSubmitted(uint256 id, string ipfsCID);

    function addFormData(uint256 _id, string memory _ipfsCID) external {
        FormData storage formData = formDataMap[_id];
        formData.id = _id;
        formData.ipfsCID = _ipfsCID;
        formDataCount++;

        emit FormSubmitted(_id, _ipfsCID);
    }

    function getFormData(uint256 _id) external view returns (string memory) {
        return formDataMap[_id].ipfsCID;
    }
}