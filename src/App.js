import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
//import Class from '../build/contracts/Class.json'
import TokenMaster from '../build/contracts/TokenMaster.json'
import StudentToken from '../build/contracts/StudentToken.json'
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
      names: ['johnp', 'akua', 'johnk', 'chris', 'alex', 'emily', 'mike', 'mahesh'],
      tokenList: [
        {tokenName: 'AAA Token', tokenSymbol: 'AAA', address: '0x662564aac2c888eb3d0d3be1b599b38bcb8a3291'},
        {tokenName: 'BBB Token', tokenSymbol: 'BBB', address: '0x662564aac2c888eb3d0d3be1b599b38bcb8a3291'},
        {tokenName: 'CCC Token', tokenSymbol: 'CCC', address: '0x662564aac2c888eb3d0d3be1b599b38bcb8a3291'}
      ],
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
        console.log("set state " + listings)
        return Promise.all(listings.map(tokenAddress => this.getStudentToken(tokenAddress)))
      }).then((listings) => {
        this.state.tokenList.forEach(token => this.logToken(token))
        //this.setState({listings: listings})
      }).catch((error) => {
        console.log(error)
      })
    })
  }
  
  logToken(token) {
    console.log("name: " + token.name + "symbol: " + token.symbol + "address: " + token.address)
  }

  getTokenMaster() {
    const tokenMaster = contract(TokenMaster)
    tokenMaster.setProvider(this.state.web3.currentProvider)
    return tokenMaster.deployed()
  }

  getStudentToken(address) {
    const studentTokenContract = contract(StudentToken)
    studentTokenContract.setProvider(this.state.web3.currentProvider)
    var studentToken = studentTokenContract.at(address)
    var newToken = {address: address}
    var tokenList = this.state.tokenList
    return studentToken.name().then((name) => {
      newToken.name = name
      return studentToken.symbol()
    }).then((symbol) => {
      newToken.symbol = symbol
      tokenList.push(newToken)
      this.setState({tokenList: tokenList})
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
    const tokenNames = this.state.tokenList.map((tokenList) =>
      <li >{tokenList.tokenName}</li>
    );
    const tokenSymbols = this.state.tokenList.map((tokenList) =>
      <li >{tokenList.tokenSymbol}</li>
    );
    const tokenContractAddresses = this.state.tokenList.map((tokenList) =>
      <li >{tokenList.address}</li>
    );
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
                <th>{tokenNames}</th>
                <th>{tokenSymbols}</th>
                <th>{tokenContractAddresses}</th>
              </tr>
            </table>

          </div>

        </div>


      </div>
    );
  }
}

export default App
