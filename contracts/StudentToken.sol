pragma solidity ^0.4.23;

contract StudentToken {
  string public name;
  string public symbol;
  uint8 public decimals;
  address public owner;

  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  
  function purchase() payable public;
}
