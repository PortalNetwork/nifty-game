import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import BattleCard from '../BattleCard';
import Loading from '../Loading';
import gameplaytitleImg from '../../images/gameplaytitle.png';
import playgameImg from '../../images/playgame.png';
import historyImg from '../../images/history.png';
import bigImg from '../../images/big.png';
import winImg from '../../images/winlogo.png';
import lostImg from '../../images/youlost.png';
import playerImg from '../../images/paayer.png';
import playerbetImg from '../../images/playerbet.png';
import resultImg from '../../images/result.png';
import user1 from '../../images/user/user1.png';
import user2 from '../../images/user/user2.png';
import user3 from '../../images/user/user3.png';
import user4 from '../../images/user/user4.png';
import user5 from '../../images/user/user5.png';
import user6 from '../../images/user/user6.png';
import user7 from '../../images/user/user7.png';
import user8 from '../../images/user/user8.png';
import user9 from '../../images/user/user9.png';
import user10 from '../../images/user/user10.png';
import user11 from '../../images/user/user11.png';
import user12 from '../../images/user/user12.png';
import user13 from '../../images/user/user13.png';
import user14 from '../../images/user/user14.png';
import { getCryptoHerosGameAddress } from '../../lib/web3Service';
import { doCreateSingleGame, doGetUserSingleGames, } from '../../lib/cryptoHerosGameService';


const cx = classnames.bind(style);

export default class extends React.Component {
  state = {
    selectedCardIdx: 0,
    betEth: 0.01,
    isLoading: false,
    isShowResult: false,
    isShowHistory: false,
    hasBattleResult: false,
    battleResult: {},
  }

  // 賭金輸入
  handleBetETHChange = e => {
    let betEth = e.target.value;
    if(betEth > 1) {
      alert('bet eth should not bigger than 1');
      betEth = 0.01;
    }

    this.setState({
      betEth,
    });
  }

  // 卡片選擇
  handleSelectChange = idx => e => {
    this.setState({
      selectedCardIdx: idx,
    });
  }

  // 開始賭
  handlePlaceBet = async e => {
    const { web3, metaMask, } = this.props;
    const { betEth, selectedCardIdx, } = this.state;
    const {account, network} = metaMask;
    

    if(betEth > 1 || betEth < 0.01) {
      alert('bet eth should not be bigger than 1 and less than 0.01');
      return;
    }
    const selectedCard = this.props.cards[selectedCardIdx];

    this.setState({
      isLoading: true,
    });
 
    const byteData = doCreateSingleGame(network, selectedCard.tokenId);
    const tx = {
      from: account,
      to: getCryptoHerosGameAddress(network),
      value: this.props.web3.toWei(betEth, 'ether'),
      data: byteData 
    };
    console.log('tx', tx);
    web3.eth.sendTransaction(tx, (err, response) => {
      console.log('response', response)
    });
    


    // window.setTimeout(() => {
    //   this.setState({
    //     isLoading: false,
    //     isShowResult: true,
    //     isShowHistory: false,
    //     hasBattleResult: true,
    //     battleResult: {
    //       isWin: true,
    //     },
    //   });
    // }, 0);
  }

  // 看歷史戰鬥
  handleShowHistory = e => {
    this.setState({
      isLoading: true,
    });

    window.setTimeout(() => {
      this.setState({
        isLoading: false,
        isShowResult: false,
        isShowHistory: true,
      });
    }, 0);
  }

  // 回到鬥技場
  handleBackArena = e => {
    this.setState({
      isLoading: false,
      isShowHistory: false,
      isShowResult: false,
      hasBattleResult: false,
      battleResult: {},
    });
  }

  render() {
    const { selectedCardIdx, betEth, isShowResult, isShowHistory, isLoading, hasBattleResult, battleResult, } = this.state;
    const { cards, isShowArena, handleBack, } = this.props;
    const userImages = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14];
    const selectedCard = cards[selectedCardIdx];

    if(!selectedCard) {
      return null;
    }

    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        <div className="ui bg_footer"></div>

        <div className="card-title">
          <img src={ gameplaytitleImg } />
        </div>

        {
          isLoading &&
          <div className={cx('loading-spinner')}>
            <div style={{display: 'inline-block', width: '100px'}}><Loading /></div>
          </div>
        }

        { /* 開局 */}
        {
          !isLoading && !isShowHistory && !isShowResult &&
          <div >
            <a className="go-back-link-in-arena" onClick={handleBack}></a>
            <div className={cx('battle-field')}>
              <div className={cx('left')}>
                <div className={cx('left-item')}>
                  <label className={cx('select_card_field')} for="select-card">
                    <select id="select-card" value={selectedCardIdx} onChange={this.handleSelectChange}>
                    {
                      cards.map((card, idx) => (<option key={idx} value={idx}>{card.tokenId}</option>))
                    }
                    </select>
                  </label>
                </div>

                <div className={cx('left-item')}>
                  <span className={cx('bet_eth_field')}>
                    <input type="number" name="betEth" value={betEth} onChange={this.handleBetETHChange} />
                  </span>
                  <a onClick={this.handlePlaceBet}>
                    <img className={cx('place_bet_button')} src={playgameImg} />
                  </a>
                </div>
              
              </div>

              <div className={cx('center')}>
                <BattleCard 
                  isLock
                  isOpenCard={true}
                  bgImg={selectedCard.bgImg || "QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"}
                  pixelImg={selectedCard.roleImg || "QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"}
                  numberImg={selectedCard.numberImg || "Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"}
                />
              </div>

              <div className={cx('right')}>
                <div className={cx('right-item')}>
                  <a onClick={this.handleShowHistory}>
                    <img className={cx('history-button')} src={historyImg} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        }

        { /* 戰鬥結果 */ }
        {
          isShowResult && 
          <div>
            <a className="go-back-link-in-arena" onClick={this.handleBackArena}></a>
            <div className={cx('battle-result')}>
              <div className={cx('left')}>
                <BattleCard 
                  isSmall
                  isLock
                  isOpenCard={true}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
                  />
              </div>
              <div className={cx('center')}>
                <div className={cx('result-center-container', { isSmall: false})}>
                  <img src={bigImg} />
                </div>
              </div>
              <div className={cx('right')}>
                <BattleCard 
                  isSmall
                  isOpenCard={false}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
                  />
              </div>
            </div>

            {
              hasBattleResult && battleResult.isWin && 
              <div className={cx('battle-result-win')}>
                <div className="start1"></div>
                <div className="start2"></div>
                <div className="start3"></div>
                <div className="start4"></div>
                <div className="start5"></div>
                <div className="start6"></div>
                <img className={cx('win')} src={winImg} />
              </div>
            }

            {
              hasBattleResult && !battleResult.isWin && 
              <div className={cx('battle-result-lose')}>
                <div className="ghost1"></div>
                <div className="ghost2"></div>
                <img className={cx('lost')} src={lostImg} />
              </div>
            }

          </div>
        }

        { /* 歷史訊息 */}
        {
          isShowHistory && 
          <div>
            <a className="go-back-link-in-arena" onClick={this.handleBackArena}></a>
            <div className={cx('battle-history-container')}>
              <div className={cx('battle-history-field')}>
                <div className={cx('header')}>
                  <span className={cx('player')}>
                    <img src={playerImg} />
                  </span>

                  <span className={cx('player-bet')}>
                    <img src={playerbetImg} />
                  </span>

                  <span className={cx('result')}>
                    <img src={resultImg} />
                  </span>
                </div>


                <div className={cx('content')}>
                  <span className={cx('player')}>
                    <img src={userImages[Math.floor(Math.random()*userImages.length)]} style={{ display: 'inline-block', width: 'auto', height: 'auto'}} />
                  </span>
                  <span className={cx('player-bet')}>bbb</span>
                  <span className={cx('result')}>ccc</span>
                </div>
                
              </div>
            </div>

          </div>
        }
      </div>
    )

  }
}
