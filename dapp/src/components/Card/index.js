import React, { Component } from 'react';
import classnames from 'classnames/bind';
import cardtitle from '../../images/cardtitle.png';
import style from './Card.css';
import { getCryptoHerosTokenAddress } from '../../lib/web3Service';
import axios from 'axios';
import LoadingCoin from '../LoadingCoin';
import Button from '@material-ui/core/Button';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

const cx = classnames.bind(style);


function ipfsUrl(hash) {
  return 'https://ipfs.infura.io/ipfs/' + hash;
}

const ErrorAlertDialog = (props) => (
  <Dialog
    open={props.isOpenAlert}
    onClose={props.handleAlertClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.errmsg}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleAlertClose} color="primary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

class Card extends Component {

  state = {
    doMintTx: '',
    isLoading: false,
    isOpenAlert: false,
    errmsg: '',
  }

  handleClickAlertOpen = () => {
    this.setState({ isOpenAlert: true });
  }

  handleAlertClose = () => {
    this.setState({ isOpenAlert: false });
  }

  CreateHero = async() =>{
    const{doMint} = this.props;
    const result = await doMint();
    this.setState({'doMintTx': result, isLoading: true},()=>{
      this.handleSubmitMetaMask(this.state.doMintTx);
    })
  }

  handleSubmitMetaMask =(doMintTx)=>{
    const {account, network} = this.props.metaMask;
    const {web3} = this.props;
    
    const msk = {
      from: account,
      to: getCryptoHerosTokenAddress(network),
      value: this.props.web3.toWei(0.01, 'ether'),
      data: doMintTx
    }

    web3.eth.sendTransaction(msk, this.handleMetaMaskCallBack);
    
  }

  handleMetaMaskCallBack = (err, result)=>{

    if(err) {
      this.setState({errmsg: 'Sorry, transaction failed'}, ()=> this.setState({isOpenAlert: true}));
      console.error('MetaMask Error:', err.message);
      this.setState({isLoading: false});
      return;
    }

    const tx = result;
    let t = setInterval(async ()=>{
      const result = await axios.get(`https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${tx}&apikey=RAADZVN65BQA7G839DFN3VHWCZBQMRBR11`);

      if(result.data.result.status === "1") {
        this.ReloadDataFn();
        window.clearInterval(t);
      }

    },3000);
  }

  ReloadDataFn =()=>{
    const {network, account} = this.props.metaMask;
    //抓卡牌編號
    this.props.handleCryptoHerosTokenGetOwnedTokens(network, account, this.props.TimeOutGoTokens);
    setTimeout(() => {
      this.setState({isLoading: false},()=> this.props.gotoAndPlayGame());
    }, 6000);
  }

  render() {
    const {brandItem, isGetCardPage, closeMyCard} = this.props;

    const alertMsg = this.state.isOpenAlert && 
      <ErrorAlertDialog 
        {...this.state} 
        handleAlertClose={this.handleAlertClose}
    />;

    return (
      <div className={cx('Card', {open: isGetCardPage})}>
        
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>

        <div className="ui start1"></div>
        <div className="ui start2"></div>
        <div className="ui start3"></div>
        <div className="ui Elf1"></div>
        <div className="ui Elf2"></div>
        <div className="ui Elf3"></div>

        <div className="cardtitle">
          <img src={cardtitle} />
          <div className="btn_box">
            <a className="goback" onClick={closeMyCard}></a>
            <a className="getHero" onClick={this.CreateHero}></a>
          </div>
        </div>

        <div className="c_mid">
          {
            brandItem.map((obj, idx)=>{
              return (
                <div className="cardBox" key={idx}>
                  <div className="cardbg">
                    <div className="s_bgcard" style={{backgroundImage: `url("${ipfsUrl(obj[2])}")` }}></div>
                    <div className="s_user" style={{backgroundImage: `url("${ipfsUrl(obj[1])}")` } }></div>
                    <div className="s_number" style={{backgroundImage: `url("${ipfsUrl(obj[3])}")` }}></div>
                  </div>
                </div>
              )
            })
          }
          <div className='addCardBtn'>
            <a onClick={this.CreateHero}></a>
          </div>
        </div>  
        {
          this.state.isLoading && <LoadingCoin/>
        }
        { alertMsg }
      </div>
    );
  }
}
export default Card;
