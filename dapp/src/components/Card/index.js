import React, { Component } from 'react';
import classnames from 'classnames/bind';
import testCard1 from '../../images/testCard1.png';
import cardtitle from '../../images/cardtitle.png';
import style from './Card.css';
import {TweenMax} from "gsap/TweenMax";
const cx = classnames.bind(style);
// let cardData = {
//   name: 'Chicken Piemon', 
//   image: testCard1,
//   HP: "0.9 ETH",
//   ATK: "9",
//   DEF: "5"
// };
// const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

function ipfsUrl(hash) {
  // return 'https://ipfs.infura.io/ipfs/' + hash;
  return "https://ipfs.infura.io/ipfs/QmeVXWcHeV5dFmeUWezMUah5p6JGKMH4qRLXNCoV4Tgfnj";
}

class Card extends Component {
  
  render() {
    const {brandItem, isGetCardPage, closeMyCard} = this.props;
    console.log("brandItem:",brandItem);
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
          <a className="goback" onClick={closeMyCard}></a>
        </div>

        <div className="c_mid">
          {
            brandItem.map((obj, idx)=>{
              return (
                <div className="cardBox" key={idx}>
                  <div className="cardbg" style={ { backgroundImage: `url(${ipfsUrl(obj.image)})` } }>
                    <p className="name">Name: {`${obj.name} - ${idx}`}</p>
                    <p className="hp">HP: {obj.HP}</p>
                    <p className="atk">ATK: {obj.ATK}</p>
                    <p className="edf">DEF: {obj.DEF}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default Card;
