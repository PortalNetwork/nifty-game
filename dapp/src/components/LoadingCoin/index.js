import React from 'react';
import classnames from 'classnames/bind';
import style from './style.css';
import loadingcoin from '../../images/loadingicoin.png';
const cx = classnames.bind(style);

export default class extends React.PureComponent {
  render() {
    return (
      <div className={cx('loading-coin-container')}>
        <img src={loadingcoin} />
      </div>
    )
  }
}