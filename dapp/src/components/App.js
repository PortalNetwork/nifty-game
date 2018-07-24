import React, { Component } from 'react';
import Card from './Card';
import Arena from './Arena';
import IndexUi from './IndexUi';
import Loading from './Loading';
import title from "../images/titlelogo.png";
import title2 from "../images/title2.png";
import './App.css';
import { MetaMask } from './MetaMask/MetaMask';
import { TweenMax } from "gsap/TweenMax";
import { Warning } from './Warning/Warning';
import { doGetTokenProperty, doGetOwnedTokens, doMint } from '../lib/cryptoHerosTokenService';

import LoadingCoin from './LoadingCoin';

class App extends Component {
  state={
    web3: null,
    brand: [],
    brandItem: [],
    isLoading: true,
    isGetCardPage: false,
    isShowArena: false,
    isLoadingCoinLoading: false,
    userOwnCards: [],
  }

  constructor(props) {
    super(props);
    this.setWeb3 = this.setWeb3.bind(this);
  }


  setWeb3(web3) {
    this.setState({web3});
  }

  Elffn = e =>{
    let wElf = document.querySelector(".Elf0").clientWidth;
    let hElf = document.querySelector(".Elf0").clientHeight;
    let scaleInt = e.pageX > window.innerWidth / 2 ? -1 : 1;
    TweenMax.to(".Elf0", 0.3, 
      { 
          left: e.pageX - (wElf / 2 ), 
          top: e.pageY - (hElf / 2 ),
          scaleX: scaleInt
      }
    )
  }

  closeMyCard = ()=>{
    this.setState({isGetCardPage: false});
  }

  //撈回所有的卡片
  TimeOutGoTokens = res =>{
    this.setState({brand: res.split(","), isLoading: false});
  }

  //進入卡牌畫面
  gotoAndPlayGame = async () =>{
    const { brand, } = this.state;
    const { network } = this.props.metaMask;
    
    const promises = brand.map(cur => doGetTokenProperty(network, cur));
    const result = await Promise.all(promises);
    this.setState({
      brandItem: result.map(cur => cur),
      isGetCardPage: true,
    });

    setTimeout(() => {
      TweenMax.staggerFrom(".cardBox", 0.5, {
        transform: "translateY(-30px)", 
        opacity:0}, 0.2
      );
    }, 0);
  }

  fetchCards = async () => {
    const { network, account, } = this.props.metaMask;
    console.log('network', network)
    console.log('account', account)
    
    const result = await doGetOwnedTokens(network, account);
    const cardsPromises = result.map(cur => doGetTokenProperty(network, cur.c));
    const detailResult = await Promise.all(cardsPromises);
    const cards = detailResult.map((cur, idx) => {
      return ({
        tokenId: result[idx].c[0],
        roleImg: cur['1'],
        numberImg: cur['3'],
        bgImg: cur['2'],
      });
    });

    
    console.log('cards', cards)
  }

  // 開局, 前往鬥技場
  handleGoArena = async e => {
    const { network, account, } = this.props.metaMask;
    console.log('network', network)
    console.log('account', account)
    
    const result = await doGetOwnedTokens(network, account);
    const cardsPromises = result.map(cur => doGetTokenProperty(network, cur.c));
    const detailResult = await Promise.all(cardsPromises);
    const userOwnCards = detailResult.map((cur, idx) => {
      return ({
        tokenId: result[idx].c[0],
        roleImg: cur['1'],
        numberImg: cur['3'],
        bgImg: cur['2'],
      });
    });

    this.setState({
      isShowArena: true,
      userOwnCards,
    });
  }

  // 從鬥技場回到首頁
  handleBackFromArena = e => {
    this.setState({
      isShowArena: false,
    });
  }

  handleOpenLoadingCoin = e => {
    this.setState({
      isLoadingCoinLoading: true,
    });
  }

  handleCloseLoadingCoin = e => {
    this.setState({
      isLoadingCoinLoading: false,
    });
  }

  componentDidMount(){
    window.addEventListener("mousemove", this.Elffn);
    let t = setInterval(()=>{
      const {network, account} = this.props.metaMask;
      if(network!==null && account!==null){
        window.clearInterval(t);
        //抓卡牌編號
        this.props.handleCryptoHerosTokenGetOwnedTokens(network, account, this.TimeOutGoTokens);
      }
    },300)
  }
  
  render() {
    const { userOwnCards, isLoading, brandItem, isGetCardPage, isShowArena, isLoadingCoinLoading, } = this.state;
    return (
      <div className="App">
        <div className="index">
          <div className="titlebox">
            <img className="title" src={title}/>
            <img className="title2" src={title2}/>
            { isLoading && <Loading/> }
            { !isLoading && <a className="gameplay" onClick={this.handleGoArena}></a>}
            { !isLoading && <a className="getCard" onClick={this.gotoAndPlayGame}></a>}
          </div>
          <IndexUi/>
          <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
          <Warning {...this.props}/>
        </div>

        <Card
          {...this.state} 
          {...this.props}
          doMint={doMint}
          TimeOutGoTokens={this.TimeOutGoTokens}
          closeMyCard={this.closeMyCard}
          isGetCardPage={isGetCardPage}
          brandItem={brandItem}
          gotoAndPlayGame={this.gotoAndPlayGame}
        />

        <Arena 
          {...this.state} 
          {...this.props}
          cards={userOwnCards}
          isShowArena={isShowArena} 
          handleBack={this.handleBackFromArena} 
          handleOpenLoadingCoin={this.handleOpenLoadingCoin}
          handleCloseLoadingCoin={this.handleCloseLoadingCoin}
        />
        { isLoadingCoinLoading && <LoadingCoin />}
      </div>
    );
  }
}

export default App;
