var { expect } = require('chai')

var TokenMaster = artifacts.require("./TokenMaster.sol");
var ExampleToken = artifacts.require("./ExampleToken.sol");

contract('ExampleToken', function(accounts) {

  it("should allow purchases", function() {
    var exampleToken
    return ExampleToken.new().then((token) => {
      exampleToken = token
      return exampleToken.balanceOf(accounts[0])
    }).then((bal) => {
      expect(bal.toNumber()).to.equal(0)
      return exampleToken.purchase({value: toUnit(4)})
    }).then(() => {
      return exampleToken.balanceOf(accounts[0])
    }).then((bal) => {
      expect(bal.toNumber()).to.equal(toUnit(40))
    })
  });

  function toUnit(num) {
    return num * 10 ** 18
  }
});
