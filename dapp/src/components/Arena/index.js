import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import cardTitleImg from '../../images/cardtitle.png';
const cx = classnames.bind(style);

export default class extends React.Component {
  render() {
    const { isShowArena, handleBack, } = this.props;
    
    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        <div className="ui start1"></div>
        <div className="ui start2"></div>
        <div className="ui start3"></div>
        <div className="ui Elf1"></div>
        <div className="ui Elf2"></div>
        <div className="ui Elf3"></div>

        <div className="card-title">
          <img src={ cardTitleImg } />
          <a className="go-back" onClick={handleBack}></a>
        </div>

      </div>
    )

  }
}
