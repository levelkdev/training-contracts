import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import johnp from './img/johnp.jpeg';
import akua from './img/akua.jpeg';
import johnk from './img/johnk.jpeg';
import chris from './img/chris.jpeg';
import alex from './img/alex.jpeg';
import emily from './img/emily.jpeg';
import raybman from './img/raybman.jpeg';
import mahesh from './img/mahesh.jpeg';
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
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
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
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
    })
  }

  render() {
    return (
      <div className="App">


        <div className="home">

          <div className="header">TA's: Make a tip</div>
      
          <div className="container">
            <div className="row">
              <div className="colsmall">
                <div><img className="circle" src={johnp} alt={"John P"}/>
                </div>
                <div className="taname">John Pignata</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={akua} alt={"Akua"}/>
                </div>
                <div className="taname">Akua Nte</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>

              <div className="colsmall">
                <div><img className="circle" src={johnk} alt={"John K"}/>
                </div>
                <div className="taname">John Kelleher</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={chris} alt={"Chris"}/>
                </div>
                <div className="taname">Chris Whinfrey</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
            </div>

            <div className="row">
              <div className="colsmall">
                <div><img className="circle" src={alex} alt={"Alex"}/>
                </div>
                <div className="taname">Alex Higuera</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={emily} alt={"Emily"}/>
                </div>
                <div className="taname">Emily Williams</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>

              <div className="colsmall">
                <div><img className="circle" src={raybman} alt={"Raybman"}/>
                </div>
                <div className="taname">Michael Raybman</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
              <div className="colsmall">
                <div><img className="circle" src={mahesh} alt={"Mahesh"}/>
                </div>
                <div className="taname">Mahesh Murthy</div>
                <div className="taname"><button title="TIP">TIP</button></div>
              </div>
            </div>
          </div>

    
        </div>


      </div>
    );
  }
}

export default App
