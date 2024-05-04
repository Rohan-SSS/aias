// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0;

contract aadhaarContract{
  struct aadhaarData{
    uint256 aadhaarId;
    string IpfsCID;
  }

  enum Role { Owner, Supervisor, aadhaarRegistrar, User}

  mapping(address => Role) private roles;
  address public owner;

  mapping(uint256 => aadhaarData) private aadhaarDataMap;
  uint256 public aadhaarCount;


  // Modifiers
  modifier onlyRole(Role role) {
    require(roles[msg.sender] == role, "Insufficient permissions");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
  }

  // Constructor
  constructor() {
    roles[msg.sender] = Role.Owner;
    owner = msg.sender;
  }


  // Events
  event aadhaarRegistered(uint256 indexed aadhaarId, string IpfsCID );
  event RoleAdded(address indexed account, Role role);
  event RoleRemoved(address indexed account, Role role);


  // Functions

  // Access Control
  // Add/Remove Supervisors
  function addSupervisor(address _account) external onlyOwner() {
    roles[_account] = Role.Supervisor;
    emit RoleAdded(_account, Role.Supervisor);
  }

  function removeSupervisor(address _account) external onlyOwner() {
    require(_account != owner, "Cannot remove owner role");
    roles[_account] = Role.User;
    emit RoleRemoved(_account, Role.Supervisor);
  }

  // Add Aadhaar registrar
  function addRegistrar(address _account) external onlyRole(Role.Supervisor) {
      _addRegistrar(_account);
  }

  function ownerAddRegistrar(address _account) external onlyOwner() {
      _addRegistrar(_account);
  }

  function _addRegistrar(address _account) private {
      roles[_account] = Role.aadhaarRegistrar;
      emit RoleAdded(_account, Role.aadhaarRegistrar);
  }

  // Remove Aadhaar registrar
  function removeRegistrar(address _account) external onlyRole(Role.Supervisor) {
      _removeRegistrar(_account);
  }

  function ownerRemoveRegistrar(address _account) external onlyOwner() {
      _removeRegistrar(_account);
  }

  function _removeRegistrar(address _account) private {
      require(_account != owner, "Cannot remove owner role");
      roles[_account] = Role.User;
      emit RoleRemoved(_account, Role.aadhaarRegistrar);
  }

  // Add Aadhaar Id to blockchain
  function registerAadhaar(uint256 _aadhaarId, string memory _IpfsCID) external onlyRole(Role.aadhaarRegistrar) {
      _registerAadhaar(_aadhaarId, _IpfsCID);
  }

  function ownerRegisterAadhaar(uint256 _aadhaarId, string memory _IpfsCID) external onlyOwner() {
      _registerAadhaar(_aadhaarId, _IpfsCID);
  }

  function _registerAadhaar(uint256 _aadhaarId, string memory _IpfsCID) private {
      require(aadhaarDataMap[_aadhaarId].aadhaarId == 0, "Aadhaar ID already exists");
      aadhaarData storage data = aadhaarDataMap[_aadhaarId];
      data.aadhaarId = _aadhaarId;
      data.IpfsCID = _IpfsCID;
      aadhaarCount++;
      emit aadhaarRegistered(_aadhaarId, _IpfsCID);
  }

  // Get Aadhaar record
  function getAadhaar(uint256 _aadhaarId) external view returns (string memory){
    return aadhaarDataMap[_aadhaarId].IpfsCID;
  }
}