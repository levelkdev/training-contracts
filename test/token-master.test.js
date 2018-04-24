var { expect } = require('chai')

var TokenMaster = artifacts.require("./TokenMaster.sol");
var ExampleToken = artifacts.require("./ExampleToken.sol");
var ClassToken = artifacts.require("./ClassToken.sol");

contract('TokenMaster', function(accounts) {

  it("should purchase tokens", function() {
    var exampleToken, tokenMaster, classToken
    return ExampleToken.new({from: accounts[3]}).then((_exampleToken) => {
      exampleToken = _exampleToken
      return TokenMaster.new()
    }).then((_tokenMaster) => {
      tokenMaster = _tokenMaster
      return tokenMaster.purchaseTokens(exampleToken.address, {value: toUnit(0.05)})
    }).then((tx) => {
      return exampleToken.balanceOf(tokenMaster.address)
    }).then((bal) => {
      expect(bal.toNumber()).to.be.greaterThan(0)
      return tokenMaster.token()
    }).then((classTokenAddress) => {
      classToken = ClassToken.at(classTokenAddress)
      return classToken.balanceOf(accounts[3])
    }).then((bal) => {
      expect(bal.toNumber()).to.equal(toUnit(100))
    })
  });
  
  it("should tip the ta", function() {
    const TIP_AMOUNT = toUnit(0.02)
    var exampleToken, tokenMaster, classToken
    return ExampleToken.new({from: accounts[3]}).then((_exampleToken) => {
      exampleToken = _exampleToken
      return TokenMaster.new()
    }).then((_tokenMaster) => {
      tokenMaster = _tokenMaster
      return tokenMaster.purchaseTokens(exampleToken.address, {value: toUnit(0.05)})
    }).then((tx) => {
      return tokenMaster.token()
    }).then((classTokenAddress) => {
      classToken = ClassToken.at(classTokenAddress)
      return classToken.approve(tokenMaster.address, TIP_AMOUNT, {from: accounts[3]})
    }).then(() => {
      return tokenMaster.tipTA("Mike", TIP_AMOUNT, {from: accounts[3]})
    }).then(() => {
      return tokenMaster.gettTaTipTotal("Mike")
    }).then((tip) => {
      expect(tip.toNumber()).to.equal(TIP_AMOUNT)
    })
  })
  
  it("should register token", function() {
    return ExampleToken.new({from: accounts[3]}).then((_exampleToken) => {
      exampleToken = _exampleToken
      return TokenMaster.new()
    }).then((_tokenMaster) => {
      tokenMaster = _tokenMaster
      return tokenMaster.registerToken(exampleToken.address)
    }).then(() => {
      return tokenMaster.numTokens()
    }).then((numTokens) => {
      expect(numTokens.toNumber()).to.equal(1)
    })
  })

  function toUnit(num) {
    return num * 10 ** 18
  }
});
