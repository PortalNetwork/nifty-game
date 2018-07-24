import React, { Component } from 'react';
import Contract from './Contract';
import SendTransactoin from './SendTransaction';
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
import { getTokenURI } from '../lib/cryptoHerosTokenService';

import Demo from "./Demo";
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
  }

  constructor(props) {
    super(props);
    this.setWeb3 = this.setWeb3.bind(this);
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
    this.setState({brand: res.split(","), isLoading: false})
  }

  //進入卡牌畫面
  gotoAndPlayGame = async () =>{
    const { brand, } = this.state;
    const { network } = this.props.metaMask;

    const promises = brand.map(cur => getTokenURI(network, cur));
    const result = await Promise.all(promises);
    this.setState({
      brandItem: result.map(cur => JSON.parse(cur)),
      isGetCardPage: true,
    });
    setTimeout(() => {
      TweenMax.staggerFrom(".cardBox", 0.5, {
        transform: "translateY(-30px)", 
        opacity:0}, 0.2
      );
    }, 0);
  }

  // 開局, 前往鬥技場
  handleGoArena = e => {
    this.setState({
      isShowArena: true,
      isLoadingCoinLoading: true,
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

  render() {
    const { isLoading, brandItem, isGetCardPage, isShowArena, isLoadingCoinLoading, } = this.state;
    return (
      <div className="App">
        {/*
          <Top/>
          <Health {...this.props} />
          <SendTransactoin {...this.props} {...this.state}/>
          <Card {...this.props}/>
          <Contract {...this.props} {...this.state} />
        */}
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
          closeMyCard={this.closeMyCard}
          isGetCardPage={isGetCardPage}
          brandItem={brandItem}
        />

        <Demo/>


        <Arena isShowArena={isShowArena} handleBack={this.handleBackFromArena} />
        <Arena 
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
