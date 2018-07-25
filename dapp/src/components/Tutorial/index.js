import React from 'react';
import classnames from 'classnames/bind';
import style from './Tutorial.css';
const cx = classnames.bind(style);

export default class extends React.Component {
  render() {
    const { onClose, } = this.props;

    return (
      <div className={cx('tutorial-container')}>
      <div className={cx('content')}>
        <h1 className={cx('headline')}>Big and Small Card Game tutorial</h1>
  
        <h2>Introduction</h2>
        <p>
          Big and Small is a card game that built under ERC-721 (NFT, non-fungible token) standard with truffle framework. 
          Each card in the game is a ERC-721, so each card in the game is unique under a specific ownership.
        </p>
        
        
        <h2>Getting started</h2>
        <p>First, you will need MetaMask to run the game. To download MetaMask, click <a href="https://metamask.io/" target="_blank">here</a></p>
        
        <p>
          Once you downloaded MetaMask, create a wallet so you can receive testnet ETH later on. See <a href="http://bit.ly/bigsmalltutorialM" target="_blank">tutorial</a>.
        </p>
        
        <p>
          Go to <a href="http://game.portal.network" target="_blank">Big and Small</a> and switch to Ropsten Test Network via your MetaMask.
        </p>
        
        <p>After switching to Ropsten Test Network, click BUY and receive Test Faucet. Simply request 1 ether from faucet and you will receive within few minutes.</p>
        
        
        <p className={cx('warning')}>***You may also play the ‘Big and Small’ on website hosted on IPFS, completely decentralized. Visit <a href="//game.portalnetworkweb.eth" target="_blank">game.portalnetworkweb.eth</a>***</p>
        
        <p className={cx('warning')}>You will need Portal Network extension to help you redirect this BNS (blockchain name service). <a href="https://chrome.google.com/webstore/detail/portal-network/apcnffelpkinnpoapmokieojaffmcpmf" target="_blank">Download now</a>.</p>
        
      
        <h2>How to play the game</h2>
        <h3>Acquiring the card</h3>
        <p>Now everything is ready. To play the game, acquire a ERC-721 card first, which will cost you 0.01 ETH. Once you sign a transaction send it to our smart contract, you will receive a card. with a random number on it. The number will be used to determine the winner late in the battle.</p>
        
        <h3>Card battle</h3>
        <p>Once you have a card, you can compete with our bot. Choose a card to play for the round. Each round, the smart contract will randomly decide either card with larger number or smaller number wins the round. At the same time, the smart contract will also randomly generate a number in order to compete with the player. Winner of the game will be able to win the bet put in.</p>
        
        <p>You can look at our smart contract at our <a href="https://github.com/PortalNetwork/nifty-game" target="_blank">github</a></p>
  
        <a className={cx('close')} onClick={onClose}>
          <img src="https://ipfs.infura.io/ipfs/QmRu3VNTA3HxgHpkqA7SVxsk2JjC96yD1Yse8rJA6NoDjw" alt="close tutorial" />
        </a>
      </div>
    </div>
    )
  }
}