pragma solidity ^0.4.23;

import "./ClassToken.sol";
import "./StudentToken.sol";

contract TokenMaster {
  address public owner;
  ClassToken public token;

  mapping(bytes32 => uint256) public taTipTotal;
  
  address[] public tokenList;
  mapping(address => bool) public tokenRegistered;
  uint256 public numTokens = 0;

  event PurchasedToken(string name, uint256 amount);
  event TATipped(string name, uint256 amount);
  event TokenRegistered(string name, uint256 number);

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor () public {
    owner = msg.sender;
    token = new ClassToken();
  }

  function purchaseTokens(StudentToken studentToken) onlyOwner public payable {
    studentToken.purchase.value(msg.value)(); // send the transaction value
    uint256 bal = studentToken.balanceOf(address(this));
    require(bal > 0); // check that tokens were purchased
    token.mint(studentToken.owner(), 100 * 10 ** 18); // Mint 100 tokens for the token's owner
    emit PurchasedToken(studentToken.name(), 0);
  }

  function tipTA(string name, uint256 amount) public {
    token.transferFrom(msg.sender, address(this), amount);
    taTipTotal[keccak256(name)] += amount;
    emit TATipped(name, amount);
  }

  function registerToken(StudentToken studentToken) public {
    require(studentToken != address(0));
    require(bytes(studentToken.name()).length != 0);
    require(!tokenRegistered[msg.sender]);
    tokenRegistered[msg.sender] = true;
    tokenList.push(studentToken);
    numTokens++;
    emit TokenRegistered(studentToken.name(), numTokens);
  }
  
  function getTokenList() public view returns (address[]) {
    return tokenList;
  }
  
  function gettTaTipTotal(string name) public view returns (uint256) {
    return taTipTotal[keccak256(name)];
  }
}
