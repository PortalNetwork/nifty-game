import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import BattleCard from '../BattleCard';
import Loading from '../Loading';
import gameplaytitleImg from '../../images/gameplaytitle.png';
import playgameImg from '../../images/playgame.png';
import historyImg from '../../images/history.png';

const cx = classnames.bind(style);

export default class extends React.Component {
  state = {
    cards: [
      '1213321',
      '1213322',
      '1213323',
      '1213324',
    ],
    selectedCard: '1213322',
    betEth: 0.01,
    isLoading: false,
    isShowResult: false,
    isShowHistory: false,
  }

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

  handleSelectChange = e => {
    this.setState({
      selectedCard: e.target.value,
    });
  }

  handlePlaceBet = e => {
    const { betEth, selectedCard, } = this.state;
    if(betEth > 1 || betEth < 0.01) {
      alert('bet eth should not be bigger than 1 and less than 0.01');
      return;
    }
    alert('pass');

  }

  render() {
    const { cards, selectedCard, betEth, isShowResult, isShowHistory, isLoading, } = this.state;
    const { isShowArena, handleBack, } = this.props;
    
    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        <div className="ui bg_footer"></div>

        <div className="card-title">
          <img src={ gameplaytitleImg } />
          <a className="go-back" onClick={handleBack}></a>
        </div>

        {
          isLoading &&
          <div className={cx('loading-spinner')}>
            <div style={{display: 'inline-block', width: '100px'}}><Loading /></div>
          </div>
        }

        { /* 開局 */}
        {
          !isLoading &&
          <div className={cx('battle-field')}>
            <div className={cx('left')}>
              <div className={cx('left-item')}>
                <label className={cx('select_card_field')} for="select-card">
                  <select id="select-card" value={selectedCard} onChange={this.handleSelectChange}>
                  {
                    cards.map(card => (<option value={card}>{card}</option>))
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
                bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
              />
            </div>

            <div className={cx('right')}>
              <div className={cx('right-item')}>
                <a onClick={()=>{alert('history')}}>
                  <img className={cx('history-button')} src={historyImg} />
                </a>
              </div>
            </div>
          </div>
        }

        { /* 戰鬥結果 */ }
        {
          isShowResult && 
          <div className={cx('battle-result')}>

          </div>
        }

        { /* 歷史訊息 */}
        {
          isShowHistory && 
          <div className={cx('battle-history')}>

          </div>
        }
      </div>
    )

  }
}
