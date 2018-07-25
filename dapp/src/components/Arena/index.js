import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import BattleCard from '../BattleCard';
import Loading from '../Loading';
import LoadingCoin from '../LoadingCoin';
import gameplaytitleImg from '../../images/gameplaytitle.png';
import playgameImg from '../../images/playgame.png';
import historyImg from '../../images/history.png';
import bigImg from '../../images/big.png';
import winImg from '../../images/winlogo.png';
import lostImg from '../../images/youlost.png';
import drawMsgImg from '../../images/draw_message.png';
import drawImg from '../../images/draw.png';
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
import { doCreateSingleGame, doGetUserSingleGames, getSingleGame, } from '../../lib/cryptoHerosGameService';
import axios from 'axios';

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
    historyGames: [],
  }

  // 賭金輸入
  handleBetETHChange = e => {
    let betEth = e.target.value;
    if (betEth > 1) {
      alert('bet eth should not bigger than 1');
      betEth = 0.01;
    }

    this.setState({
      betEth,
    });
  }

  // 卡片選擇
  handleSelectChange = e => {
    this.setState({
      selectedCardIdx: e.target.value,
    });
  }

  // 開始賭
  handlePlaceBet = async e => {
    const { web3, metaMask, historyGamesCount, } = this.props;
    const { betEth, selectedCardIdx, historyGames, } = this.state;
    const { account, network } = metaMask;

    if (betEth > 1 || betEth < 0.01) {
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
    
    web3.eth.sendTransaction(tx, (err, response) => {
      if(err) {
        alert('Sorry, transaction failed');
        this.setState({
          isLoading: false,
        });
        return;
      }

      let t = setInterval(async () => {
        const result = await axios.get(`https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${response}&apikey=RAADZVN65BQA7G839DFN3VHWCZBQMRBR11`)
        if (result.data.status === "1") {
          
          const gameChecker = window.setInterval(async () => {
            const games = await doGetUserSingleGames(network, account);

            //FIXME: 透過 user 戰鬥場數來判斷此役戰鬥在合約中是否已確實完成
            //       但礙於組建設計不良, 生命週期混亂, 只能透過在 App.js 取得的 historyGamesCount
            //       以及本地取得的 historyGames 做雙重判斷, 之後需要更改
            if(games.length <= historyGames.length || games.length <= historyGamesCount) {
              return;
            }
            window.clearInterval(gameChecker);
            console.log('clean gameChecker');
            const gamePromises = games.map(cur => getSingleGame(network, cur.c[0], account));
            const gameDetails = await Promise.all(gamePromises);
            const thisGame = gameDetails[gameDetails.length - 1];
            const userPointer = thisGame[1].c[0];
            const contractPointer = thisGame[2].c[0];
            const userBet = thisGame[3].c[0];
            const gameType = thisGame[4].c[0]; // 0 = compare less 1 = compare big
            const isWin = thisGame[5].c[0];    // 0 win, 1 lost, 2 平手
            const isUserSmall = userPointer < contractPointer;

            const battleResult = {
              userPointer,
              contractPointer,
              userBet,
              isUserSmall,
              gameType,
              isWin,
            };

            window.setTimeout(() => {
              this.setState({
                isLoading: false,
                isShowResult: true,
                isShowHistory: false,
                hasBattleResult: true,
                battleResult,
              });
            }, 0);
          }, 1234);
          window.clearInterval(t);
        }
      }, 3000);



    });
  }

  // 看歷史戰鬥
  handleShowHistory = async e => {
    const { web3, metaMask, } = this.props;
    const { account, network } = metaMask;

    this.setState({
      isLoading: true,
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
    console.log('historyGames', historyGames)

    window.setTimeout(() => {
      this.setState({
        isLoading: false,
        isShowResult: false,
        isShowHistory: true,
        historyGames,
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
    const { selectedCardIdx, betEth, isShowResult, isShowHistory, isLoading, hasBattleResult, battleResult, historyGames, } = this.state;
    const { cards, isShowArena, handleBack, } = this.props;
    const userImages = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14];
    const selectedCard = cards[selectedCardIdx];
    const numberImgs = [
      'QmNbPeXSeUEg6oEhRVFa5uSwVdi8GbXewttkVKf3zX2oyX',
      'QmaJUZLbFN4D3HkjEWbUrUqJXtFfjEjVcbauE3YSh393ht',
      'QmSdjH5q4Y3h8Uv6knNL4wybgi5Kxrxbni335Y5ooMtKjg',
      'Qmdi4p96LLjrmgoj5pJRSLnorJZ4bzdddyrN2jjLM6fXke',
      'QmNnvqXtomFAiM34aJRd2rTimCyQnxeemHTLZWwxTGXeWa',
      'QmTMig9fwhU77oaWKMHYvMbb3b1wyWviWUxEeYHBdH2T9f',
      'QmQXDnUzPSfrQWLcc4vXeVyZquW8cPN4b3qU8zcpsf6ZDP',
      'QmQ8Hg8aXtqET4Apd6AGDLmeZTsi9JVvZnMdRGsvdYBgkx',
      'QmWQ3oxfnXzpw35wiGnrc2HNV3U6iT4eT6VpoEtLwdKUsT',
      'QmUHsb1T1NuEL1TDQMD1dENpZFYP9NsnLo2iohKR3ydz2t',
      'QmaQc91N7YvZ8NaxeQfe9xpiVErTH5EJqTiyWVjf6CnV9X',
      'QmYtQprzsas3NzA7v4i8y1PJf89bMdr3bUqEqLgXkmfN6X',
      'Qmcsu3ATk6cwhXSi2nhkeZqJc6Urk9o6sWX5ZapMDLhedA',
      'QmWCk6YgA13WZkF8exa1atTAFx6nzNaYbyYf2jZQRTEJyL',
      'QmVDYWJs9RNxX75agGWmKTyLrsaFEJqfFqEcDMVbg9Ftnq',
      'Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk',
      'QmZPkZq2XjPVa1oWWLiVDii7okohRrUw1CuzJvicHwUsCa',
      'QmZguKxTcU6wpGoz9MUfy5nN4EHMFABHejUrTdjou2hJ1M',
      'QmWzdBNu1ikXvcXo7C1WyUk3FxWRnDo5gt2WKm14Rcs1Pc',
      'Qmf8MPrUF41e5N5rtXVEGZg5AC7m8NLsjqf9ad9fvwVSrw',
    ]

    if (!selectedCard) {
      return null;
    }

    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        <div className="ui bg_footer"></div>

        <div className="card-title">
          <img src={gameplaytitleImg} />
        </div>

        { /* 開局 */}
        {
          !isLoading && !isShowHistory && !isShowResult &&
          <div >
            <a className="go-back-link-in-arena" onClick={handleBack}></a>
            <div className={cx('battle-field')}>
              <div className={cx('left')}>
                <div className={cx('left-item')}>
                  <label className={cx('select_card_field')} htmlFor="select-card">
                    <select id="select-card" value={selectedCardIdx} onChange={this.handleSelectChange}>
                      {
                        cards.map((card, idx) => (<option key={idx} value={idx}>{card.tokenId}</option>))
                      }
                    </select>
                  </label>
                </div>

                <div className={cx('left-item')}>
                  <span className={cx('bet_eth_field')}>
                    <input type="number" name="betEth" value={betEth} max="1" step="0.01" min="0.01" onChange={this.handleBetETHChange} />
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

        { /* 戰鬥結果 */}
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
                  bgImg={selectedCard.bgImg || "QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"}
                  pixelImg={selectedCard.roleImg || "QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"}
                  numberImg={selectedCard.numberImg || "Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"}
                />
              </div>
              <div className={cx('center')}>
                <div className={cx('result-center-container', { isSmall: battleResult.isUserSmall })}>
                  { hasBattleResult && battleResult.isWin <= 1 && <img src={bigImg} /> }
                  { hasBattleResult && battleResult.isWin === 2 && <img src={drawImg} /> }
                </div>                
              </div>
              <div className={cx('right')}>
                <BattleCard
                  isSmall
                  isOpenCard={false}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg={numberImgs[battleResult.contractPointer - 1]}
                />
              </div>
            </div>

            {
              hasBattleResult && battleResult.isWin === 0 && 
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
              hasBattleResult && battleResult.isWin === 1 &&
              <div className={cx('battle-result-lose')}>
                <div className="ghost1"></div>
                <div className="ghost2"></div>
                <img className={cx('lost')} src={lostImg} />
              </div>
            }

            {
              hasBattleResult && battleResult.isWin === 2 &&
              <div className={cx('battle-result-win')}>
                <img className={cx('win')} src={drawMsgImg} />
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


                {
                  historyGames.map(game => {
                    return (
                      <div className={cx('content')}>
                        <span className={cx('player')}>
                          <img src={userImages[Math.floor(Math.random() * userImages.length)]} style={{ display: 'inline-block', width: 'auto', height: 'auto' }} />
                        </span>
                        <span className={cx('player-bet')}>{game.userBet}</span>
                        <span className={cx('result')}>{game.isWin === 0 ? 'WIN' : game.isWin === 1 ? 'LOSE' : 'DRAW'}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        }

        {
          isLoading && <LoadingCoin />
        }
      </div>
    )

  }
}
