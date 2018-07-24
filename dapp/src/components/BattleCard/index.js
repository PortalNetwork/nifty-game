import React from 'react';
import classnames from 'classnames/bind';
import style from './style.css';
const cx = classnames.bind(style);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCard: props.isOpenCard,
      isLock: props.isLock || false,
    };
  }

  handleOpenCard = () => {
    // 若鎖定牌卡則禁止翻牌
    if (this.state.isLock) {
      return;
    }
    
    this.setState({
      isOpenCard: !this.state.isOpenCard
    });
  }

  render() {
    const { bgImg, pixelImg, numberImg, } = this.props;
    const { isOpenCard, } = this.state;

    return (
      <div className="cardbox" onClick={this.handleOpenCard}>
        <div className={cx('gameCard', { OpenCard: isOpenCard })}>
          <div className="seeCard">
            <div className="c_bg" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${bgImg})` }}></div>
            <div className="c_user" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${pixelImg})` }}></div>
            <div className="c_number" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${numberImg})` }}></div>
          </div>
          <div className="BackCard"></div>
        </div>
      </div>
    );
  }
}
