import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
//import Class from '../build/contracts/Class.json'
import TokenMaster from '../build/contracts/TokenMaster.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

import johnp from './img/johnp.jpeg';
import akua from './img/akua.jpeg';
import johnk from './img/johnk.jpeg';
import chris from './img/chris.jpeg';
import alex from './img/alex.jpeg';
import emily from './img/emily.jpeg';
import mike from './img/raybman.jpeg';
import mahesh from './img/mahesh.jpeg';
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: [],
      web3: null,
      listings: [],
      balances: {},
      names: ['johnp', 'akua', 'johnk', 'chris', 'alex', 'emily', 'mike', 'mahesh']
      tokenName: 'AAA Token',
      tokenSymbol: 'AAA', 
      tokenContractAddress: '0x662564aac2c888eb3d0d3be1b599b38bcb8a3291'
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
      this.taTips()
      this.tokenListings()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    var tokenMasterInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getTokenMaster().then((instance) => {
        tokenMasterInstance = instance
        return tokenMasterInstance.tokenList.call()
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result })
      })
    })

    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

/*    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })*/

  }

  taTips () {
    var tokenMasterInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getTokenMaster().then((instance) => {
        tokenMasterInstance = instance
        return Promise.all(this.state.names.map(name => this.getTATipTotal(tokenMasterInstance, name)))
      }).then(() => {
        console.log("tip balances " + this.state.balances)
        //this.setState({listings: listings})
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  //registryInstance = tokenMasterInstance
  //getRegistry = getTokenMaster
  //returns an array of token addresses: tokenList
  tokenListings () {
    var tokenMasterInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getTokenMaster().then((instance) => {
        tokenMasterInstance = instance
        return tokenMasterInstance.getTokenList()
      }).then((listings) => {
        return Promise.all(listings.map(entry => this.getEntry(tokenMasterInstance, entry)))
      }).then((listings) => {
        console.log("set state " + listings)
        //this.setState({listings: listings})
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  getTokenMaster() {
    const tokenMaster = contract(TokenMaster)
    tokenMaster.setProvider(this.state.web3.currentProvider)
    return tokenMaster.deployed()
  }

  getEntry(tokenMasterInstance, entry) {
    return tokenMasterInstance.getTokenList().then((listing) => {
      console.log(listing)
      this.setState({listings: listing})
      return {
        tokenList: entry,
        name: window.web3.toAscii(entry),
        address: listing
      }
    })
  }

  getTATipTotal(tokenMasterInstance, name) {
    return tokenMasterInstance.gettTaTipTotal(name).then((balance) => {
      console.log(balance.toString())
      var balances = this.state.balances
      balances[name] = balance.toString()
      this.setState({balances: balances})
    })
  }

  render() {

    return (
      <div className="App">


        <div className="home">

          <div className="header">TA's: Make a tip</div>
          <div className="balance">Your balance: {this.state.listings} CLS</div>
          
          <div className="container">
            <div className="row">
              <div className="colsmall">
                <div><img className="circle" src={johnp} alt={"John P"}/>
                </div>
                <div className="taname">John Pignata</div>
                <div className="taname balance">{this.state.balances.johnp} CLS</div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={akua} alt={"Akua"}/>
                </div>
                <div className="taname">Akua Nte</div>
                <div className="taname balance">{this.state.balances.akua} CLS</div>
              </div>

              <div className="colsmall">
                <div><img className="circle" src={johnk} alt={"John K"}/>
                </div>
                <div className="taname">John Kelleher</div>
                <div className="taname balance">{this.state.balances.johnk} CLS</div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={chris} alt={"Chris"}/>
                </div>
                <div className="taname">Chris Whinfrey</div>
                <div className="taname balance">{this.state.balances.chris} CLS</div>
              </div>
            </div>

            <div className="row">
              <div className="colsmall">
                <div><img className="circle" src={alex} alt={"Alex"}/>
                </div>
                <div className="taname">Alex Higuera</div>
                <div className="taname balance">{this.state.balances.alex} CLS</div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={emily} alt={"Emily"}/>
                </div>
                <div className="taname">Emily Williams</div>
                <div className="taname balance">{this.state.balances.johnp} CLS</div>
              </div>

              <div className="colsmall">
                <div><img className="circle" src={mike} alt={"Raybman"}/>
                </div>
                <div className="taname">Michael Raybman</div>
                <div className="taname balance">{this.state.balances.mike} CLS</div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={mahesh} alt={"Mahesh"}/>
                </div>
                <div className="taname">Mahesh Murthy</div>
                <div className="taname balance">{this.state.balances.mahesh} CLS</div>
              </div>
            </div>
          </div>


          <div className="container">
            <div className="tokenList header">List of Tokens:</div>

            <table>
              <tr className="tableRow">
                <th className="cellEntry"><i>Token Name:</i></th>
                <th className="cellEntry"><i>Token Symbol:</i></th> 
                <th className="cellEntry"><i>Token Contract Address:</i></th> 
              </tr>
              <tr className="tableRow">
                <th className="cellEntry">{this.state.tokenName}</th>
                <th className="cellEntry">{this.state.tokenSymbol}</th> 
                <th className="cellEntry" >{this.state.tokenContractAddress}</th> 
              </tr>
              <tr className="tableRow">
                <th className="cellEntry">{this.state.tokenName}</th>
                <th className="cellEntry">{this.state.tokenSymbol}</th> 
                <th className="cellEntry" >{this.state.tokenContractAddress}</th> 
              </tr>
              <tr className="tableRow">
                <th className="cellEntry">{this.state.tokenName}</th>
                <th className="cellEntry">{this.state.tokenSymbol}</th> 
                <th className="cellEntry" >{this.state.tokenContractAddress}</th> 
              </tr>
              <tr className="tableRow">
                <th className="cellEntry"></th>
                <th className="cellEntry"></th> 
                <th className="cellEntry"></th> 
              </tr>
            </table>

          </div>

        </div>


      </div>
    );
  }
}

export default App
