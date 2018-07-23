import React, { Component } from 'react';
import {MetaMask} from './MetaMask/MetaMask';
import Contract from './Contract';
import {TweenMax} from "gsap/TweenMax";
import {Warning} from './Warning/Warning';

import SendTransactoin from './SendTransaction';
import Card from './Card';

import IndexUi from './IndexUi';
import Loading from './Loading';
import './App.css';
import title from "../images/title.png";
import title2 from "../images/title2.png";
import { 
  getTokenURI
} from '../lib/cryptoHerosTokenService';
class App extends Component {

  state={
    web3: null,
    brand: [],
    brandItem: [],
    isLoading: true,
    isGetCardPage: false,
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
    this.setState({brand: res.split(","), isLoading: false})
  }

  //進入卡牌畫面
  gotoAndPlayGame = async () =>{
    let brandObj = [];
    const { handleCryptoHerosTokenTokenURI } = this.props;
    const { network } = this.props.metaMask;

    this.state.brand.forEach(async (item, idx) => {
      const contents = await getTokenURI(network, item);
      brandObj.push(JSON.parse(contents));
      if(this.state.brand.length - 1 === idx){
        setTimeout(() => {
          this.setState({brandItem: brandObj, isGetCardPage: true}, ()=>{
            TweenMax.staggerFrom(".cardBox", 0.5, {transform: "translateY(-30px)", opacity:0}, 0.2);
          });
        }, 500);
      }
    })
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
    const {handleCryptoHerosTokenTokenURI, cryptoHerosOwned} = this.props;
    const {network, account} = this.props.metaMask;
    const {isLoading, brandItem, isGetCardPage} = this.state;
    return (
      <div className="App">
        {/*<Top/>*/}
        {/*<Health {...this.props} />*/}
        {/*<SendTransactoin {...this.props} {...this.state}/>*/}
        {
          /*
          <Card {...this.props}/>
        <Contract {...this.props} {...this.state} />
          */
        }

        <div className="index">
          <div className="titlebox">
            <img className="title" src={title}/>
            <img className="title2" src={title2}/>
            { isLoading?  <Loading/> : <a className="gameplay"></a> }
            { isLoading?  '': <a className="getCard" onClick={this.gotoAndPlayGame}></a>}
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

      </div>
    );
  }
}

export default App;
