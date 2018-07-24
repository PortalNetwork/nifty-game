import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import gameplaytitleImg from '../../images/gameplaytitle.png';
import playgameImg from '../../images/playgame.png';
import historyImg from '../../images/history.png';

const cx = classnames.bind(style);

export default class extends React.Component {
  render() {
    const { isShowArena, handleBack, } = this.props;
    
    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        { false && <div className="ui bg_footer"></div>}

        <div className="card-title">
          <img src={ gameplaytitleImg } />
          <a className="go-back" onClick={handleBack}></a>
        </div>


        <div className={cx('battle-field')}>
          <div className={cx('left')}>
            <div className={cx('left-item')}>
              <label className={cx('select_card_field')} for="select-card">
                <select id="select-card">
                  <option>1213321</option>
                  <option>1213322</option>
                  <option>1213323</option>
                  <option>1213324</option>
                </select>
              </label>
            </div>

            <div className={cx('left-item')}>
              <span className={cx('bet_eth_field')}>
                <input type="number" />
              </span>
              <a onClick={()=>{alert('bet')}}>
                <img className={cx('place_bet_button')} src={playgameImg} />
              </a>
            </div>
          
          </div>

          <div className={cx('center')}>center</div>

          <div className={cx('right')}>
            <div className={cx('right-item')}>
              <a onClick={()=>{alert('history')}}>
                <img className={cx('history-button')} src={historyImg} />
              </a>
            </div>
          </div>
        </div>




        
      </div>
    )

  }
}
