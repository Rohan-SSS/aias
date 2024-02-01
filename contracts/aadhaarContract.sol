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
  }


  // Events
  event aadhaarRegistered(uint256 indexed aadhaarId, string IpfsCID );
  event RoleAdded(address indexed account, Role role);
  event RoleRemoved(address indexed account, Role role);


  // Functions

  // Access Control
  function addSupervisor(address _account) external onlyOwner() {
    roles[_account] = Role.Supervisor;
    emit RoleAdded(_account, Role.Supervisor);
  }

  function removeSupervisor(address _account) external onlyOwner() {
    require(_account != owner, "Cannot remove owner role");
    roles[_account] = Role.User;
    emit RoleRemoved(_account, Role.Supervisor);
  }

  function addRegistrar(address _account) external onlyRole(Role.Supervisor) {
    roles[_account] = Role.aadhaarRegistrar;
    emit RoleAdded(_account, Role.aadhaarRegistrar);
  }

  function removeRegistrar(address _account) external onlyRole(Role.Supervisor) {
    require(_account != owner, "Cannot remove owner role");
    roles[_account] = Role.User;
    emit RoleRemoved(_account, Role.aadhaarRegistrar);
  }

  // Aadhaar
  function registerAadhaar( uint256 _aadhaarId, string memory _IpfsCID) external onlyRole(Role.aadhaarRegistrar){
    require(aadhaarDataMap[_aadhaarId].aadhaarId == 0, "Aadhaar ID already exists");
    aadhaarData storage data = aadhaarDataMap[_aadhaarId];
    data.aadhaarId = _aadhaarId;
    data.IpfsCID = _IpfsCID ;
    aadhaarCount++;
    emit aadhaarRegistered(_aadhaarId, _IpfsCID);
  }

  function getAadhaar(uint256 _aadhaarId)external view returns (string memory){
    return aadhaarDataMap[_aadhaarId].IpfsCID;
  }
}