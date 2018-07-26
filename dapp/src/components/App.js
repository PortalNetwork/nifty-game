import React, { Component } from 'react';
import Card from './Card';
import Arena from './Arena';
import IndexUi from './IndexUi';
import Loading from './Loading';
import Tutorial from './Tutorial';
import title from "../images/titlelogo.png";
import title2 from "../images/title2.png";
import './App.css';
import { MetaMask } from './MetaMask/MetaMask';
import { TweenMax } from "gsap/TweenMax";
import { Warning } from './Warning/Warning';
import { doGetTokenProperty, doGetOwnedTokens, doMint } from '../lib/cryptoHerosTokenService';
import { doGetUserSingleGames, getSingleGame, } from '../lib/cryptoHerosGameService';

import LoadingCoin from './LoadingCoin';
import NiftyAlert from "./NiftyAlert";

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
    historyGamesCount: 0,
    isErrorOpen: false,
    isShowTutorial: false,
    errorMessage: ''
  }

  constructor(props) {
    super(props);
    this.setWeb3 = this.setWeb3.bind(this);
  }

  handleAlertOpen=(errmag)=>{
    this.setState({isErrorOpen: true, errorMessage: errmag})
  }

  handleAlertClose=()=>{
    this.setState({isErrorOpen: false})
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
    },300);

  }

  componentDidUpdate(prevProps) {
    if(this.props.metaMask.account && prevProps.metaMask.account && this.props.metaMask.account !== prevProps.metaMask.account) {
      window.location.reload();
    }
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
    this.setState({
      isLoadingCoinLoading: true,
    });

    const { network, account, } = this.props.metaMask;
    const result = await doGetOwnedTokens(network, account);
    const cardsPromises = result.map(cur => doGetTokenProperty(network, cur.c));
    const brandItem = await Promise.all(cardsPromises);

    this.setState({
      brandItem,
      isGetCardPage: true,
      isLoadingCoinLoading: false,
    });

    setTimeout(() => {
      TweenMax.staggerFrom(".cardBox", 0.5, {
        transform: "translateY(-30px)", 
        opacity:0}, 0.2
      );
    }, 0);
  }

  // 開局, 前往鬥技場
  handleGoArena = async e => {
    this.setState({
      isLoadingCoinLoading: true,
    });

    const { network, account, } = this.props.metaMask;
    const result = await doGetOwnedTokens(network, account);

    if(result.length === 0) {
      this.handleAlertOpen('You have no cards, please get card');
      // alert('You have no cards, please get card');
      this.setState({
        isLoadingCoinLoading: false,
      });
      this.gotoAndPlayGame();
      return;
    }

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

    const games = await doGetUserSingleGames(network, account);
    const gamePromises = games.map(cur => getSingleGame(network, cur.c[0], account));
    const gameDetails = await Promise.all(gamePromises);
    const historyGames = gameDetails.map(game => {
      return ({
        userBet: game[3].c[0] / 10000,
        isWin: game[5].c[0],
      });
    });

    this.setState({
      isLoadingCoinLoading: false,
      isShowArena: true,
      historyGamesCount: historyGames.length,
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

  // 開啟教戰手冊
  handleOpenTutorial = e => {
    this.setState({
      isShowTutorial: true,
    });
  }

  // 關閉教戰手冊
  handleCloseTutorial = e => {
    this.setState({
      isShowTutorial: false,
    });
  }
  
  render() {
    const { 
      userOwnCards, isLoading, brandItem, isGetCardPage, 
      isShowArena, isLoadingCoinLoading, historyGamesCount, 
      isShowTutorial, 
    } = this.state;

    return (
      <div className="App">
        <div className="index">
          <div className="titlebox">
            <img className="title" src={title}/>
            <img className="title2" src={title2}/>
            { isLoading && <Loading/> }
            { !isLoading && <a className="gameplay" onClick={this.handleGoArena}></a>}
            { !isLoading && <a className="getCard" onClick={this.gotoAndPlayGame}></a>}
            <a className="showTutorial" onClick={this.handleOpenTutorial}></a>
          </div>
          <IndexUi/>
          <MetaMask {...this.props} {...this.state} setWeb3={this.setWeb3}/>
          <Warning {...this.props}/>
          {this.state.isErrorOpen && 
            <NiftyAlert 
              isOpenAlert={this.state.isErrorOpen}
              errorMessage={this.state.errorMessage}
              handleAlertClose={this.handleAlertClose}
            />
          }
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
          historyGamesCount={historyGamesCount}
          handleBack={this.handleBackFromArena} 
          handleOpenLoadingCoin={this.handleOpenLoadingCoin}
          handleCloseLoadingCoin={this.handleCloseLoadingCoin}
        />

        { isShowTutorial && <Tutorial onClose={this.handleCloseTutorial}  /> }
        { isLoadingCoinLoading && <LoadingCoin />}
      </div>
    );
  }
}

export default App;
