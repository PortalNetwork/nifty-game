import React, { Component } from 'react';

class Card extends Component {
  render() {
    const tokenURI = this.props.cryptoHerosOwnedTokenURI && 
      <div style={{padding: '1em', margin: '1em', border: '1px solid black'}}>
        <img width="200" src={this.props.cryptoHerosOwnedTokenURI.image} alt=""/>
        <p>{this.props.cryptoHerosOwnedTokenURI.name}</p>
        <p>{this.props.cryptoHerosOwnedTokenURI.HP}</p>
        <p>{this.props.cryptoHerosOwnedTokenURI.ATK}</p>
        <p>{this.props.cryptoHerosOwnedTokenURI.DEF}</p>
      </div>;
    return (
      <div>
        {tokenURI}
      </div>
    );
  }
}

export default Card;
