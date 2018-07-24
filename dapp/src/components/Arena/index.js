import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import {TweenMax} from "gsap/TweenMax";
const cx = classnames.bind(style);

export default class extends React.Component {
  render() {
    const { isShowArena, handleBack, } = this.props;
    
    return (
      <div className={cx('arena', { open: isShowArena })}>
        ALKSDJFLKSDJFSLKDFJSLDFSDL
        IRUWEOIRUEORWIRUOWEIRUWEORIWUOIUEWORE
        XMCNVXCZCZXCXZC


        <a onClick={handleBack}>BACK</a>
      </div>
    )

  }
}
