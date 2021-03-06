import React, {useEffect, useState} from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("")

  const checkIfWalletIsConnected = async () => {
    try{
      const {ethereum} = window
      if(!ethereum){
        console.log("Make sure you have Metamask!")
      }else{
        console.log("We have ethereum object", ethereum)
      }

      const accounts = await ethereum.request({method: 'eth_accounts'})

      if(accounts.length == 0){
        const account = accounts[0]
        console.log("Found an authorized account:", account)
        setCurrentAccount(account)
      }else{
        console.log("No authorized account found")
      }

    }catch(error){
      console.log(error)
    }
  }

  const connectWallet= async () => {
    try{
      const {ethereum} = window

      if(!ethereum){
        alert("Get Metamask!")
        return;
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'})

      console.log("connected", accounts[0])
      setCurrentAccount(accounts[0])

    }catch(error){
      console.log(error)
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick= {connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() =>{
    checkIfWalletIsConnected()
  }, [])

  return (
     <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={null} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;