<p align=center>
<img src="./icon.png">
</p>

<p align=center>
<a target="_blank" href="https://travis-ci.org/PortalNetwork/nifty-game.svg?branch=develop" title="Build status"><img src="https://travis-ci.org/PortalNetwork/nifty-game.svg?branch=develop"></a>
<a target="_blank" href="https://reactjs.org/" title="React"><img src="https://img.shields.io/badge/react-%3E%2016.1.1-brightgreen.svg"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen.svg"></a>
<a target="_blank" href="https://github.com/PortalNetwork/nifty-game/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
</p>  

> Non-fungible token game

This project is a crypto card game that uses [OpenZepplin](https://github.com/OpenZeppelin/openzeppelin-solidity).

The contract is compiled and deployed under the ERC-721 non-fungible token standard with truffle framework. After deploying onto the Ethereum blockchain, users will be able to play the game by interacting with the smart contract through DAPP’s front-end interface.

Acquiring game card:
Users can acquire game cards using ETH. Every game card will have a game point on it, which will be used to determine the winner later in the game.

Playing the game:
Once entered the game, players will need to choose a card to play for the round. Each round, the smart contract will randomly decide either card with larger or smaller point wins the round. At the same time, the smart contract will also randomly generate a number in order to compete with the player. Winner of the game will be able to win the bet put in.

## ERC-721 Token

ERC-721 non-fungible token:
    ERC-721 is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain. While most tokens are fungible (every token is the same as every other token), ERC-721 tokens are all unique (with unique ID).

[Reference](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)


## Contracts
You can find contract detail under `contracts/` directory:
- [`CryptoHerosGame.sol`](./contracts/CryptoHerosGame.sol):
    The implementation of game execution and rule.

- [`CryptoHerosToken.sol`](./contracts/CryptoHerosToken.sol):
    The implementation of game cards purchase and generation.

## Technical stack

### Frontend
- React
- Redux
- Saga
- Web3(MetaMask)

### UI
- Sass
- Material-UI

### Smart contract/Solidity
- Truffle

### Test environment/Private chain
- ganache

## Requirements

* NodeJS 6.0+ recommended.
* Windows, Linux or Mac OS X.

## How To Install Dependencies

First install required dependencies:

You'll need local ethereum node, I recommend `ganache-cli`. You can install it from npm.

```
npm install -g ganache-cli
```

Then install contract dependencies:  

```
npm install
```

## How To Test

First make sure that local ethereum node is running. Execute:

```
ganache-cli --gasLimit 0xffffffffff -p 8545
```

Now you can compile and deploy contracts:

```
truffle compile && truffle migrate
```

Run contract tests:

```
truffle test
```

## Playground

We already deployed contracts to Ropsten network. You can play with them RIGHT NOW.

| Contract | Token address | Transaction hash
|-|-|-
| CryptoHerosGame |  | 
| CryptoHerosToken |  | 