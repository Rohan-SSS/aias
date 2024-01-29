// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract testForm {
    struct FormData {
        string name;
        uint256 id;
    }

    mapping(uint256 => FormData) formDataMap;
    uint256 public formDataCount;

    event FormSubmitted(string name, uint256 id);

    function addFormData(string memory _name, uint256 _id) external {
        FormData storage formData = formDataMap[_id];
        formData.name = _name;
        formData.id = _id;
        formDataCount++;

        emit FormSubmitted(_name, _id);
    }

    function getFormData(uint256 _id) external view returns (string memory) {
        return formDataMap[_id].name;
    }
}
