<p align=center>
<img src="./icon.png">
</p>

<p align=center>
<a target="_blank" href="https://travis-ci.org/PortalNetwork/nifty-game.svg?branch=develop" title="Build status"><img src="https://travis-ci.org/PortalNetwork/nifty-game.svg?branch=develop"></a>
<a target="_blank" href="https://reactjs.org/" title="React"><img src="https://img.shields.io/badge/react-%3E%2016.1.1-brightgreen.svg"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg"></a>
<a target="_blank" href="https://github.com/PortalNetwork/nifty-game/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
</p>  


> Non-fungible token game

這是一款加密卡牌遊戲，使用[OpenZepplin](https://github.com/OpenZeppelin/openzeppelin-solidity)。
在ERC-721 non-fungible token 標準下建置合約，透過truffle框架編寫及部署合約，合約部署之後，使用者可以透過前端來跟dApp互動，再由dApp呼叫部署在以太坊上的合約來進行遊戲。

遊戲方式：
    玩家先使用ether來兌換卡牌，每張卡牌上面有不一樣的點數。 擁有卡牌之後可以開始對戰，對戰開始之前玩家必須先選擇自己要出的卡牌，之後系統會隨機決定此回合是比大或是比小，並且隨機產生點數，玩家獲勝之後可獲得獎勵。

## ERC-721 Token

ERC-721 non-fungible token：
    符合這合約的每個token都是不一樣的，擁有獨一無二的token ID，與ERC-20相比，ERC-20的token可以彼此互換的，使用者A的50個token與使用者B的50個token是沒有差別的，但如果是ERC-721的話因為每個token ID都不一樣，所以不可以互換，視為獨立的資產。

## Contracts
合約內容存放在`contracts/`底下：
- `CryptoHerosGame.sol`：
    遊戲實際執行方式、規則實作在此合約內
- `CryptoHerosToken.sol`：
    卡牌購買、產生方法實作在此合約內

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

* NodeJS 8.0以上.
* Windows, Linux 或 Mac OS X.

## How To Install Dependencies

先安裝所需的相關套件：  
  
會需要在local端起一個以太坊的節點，推薦使用 `ganache-cli`，你可以透過 npm install來安裝。

```
npm install -g ganache-cli
```

安裝truffle：

```
npm install -g truffle
```

安裝其餘所需的套件:  

```
npm install
```

## How To Test

先確定local端的以太坊節點有成功啟動. 執行：

```
ganache-cli --gasLimit 0xffffffffff -p 8545
```

然後編譯並且部署合約：

```
truffle compile && truffle migrate
```

測試合約：

```
truffle test
```

## Playground

我們已經將合約部署至 [Ropsten](https://ropsten.etherscan.io/) 測試鏈上。 你可以直接對合約進行操作。

| Contract         | Token address | Transaction hash
|------------------|---------------|---------------------
| CryptoHerosGame  | [0x7e6A075669bf4D0B91750B6656A26cCB3a08adbd](https://ropsten.etherscan.io/address/0x7e6A075669bf4D0B91750B6656A26cCB3a08adbd) | [0xd09a7c09e70a8d9d9933138ca5b54757b64fe3f076defc0a8cb1bf3e9eb75889](https://ropsten.etherscan.io/tx/0xd09a7c09e70a8d9d9933138ca5b54757b64fe3f076defc0a8cb1bf3e9eb75889)
| CryptoHerosToken | [0xf70F7d4e063E50B68a08db043f6345ea68A446bE](https://ropsten.etherscan.io/address/0xf70f7d4e063e50b68a08db043f6345ea68a446be) | [0xd6f3989edb1df46325ab4df12fbc6efbde10088ca18e1e2cee866ce03d66751d](https://ropsten.etherscan.io/tx/0xd6f3989edb1df46325ab4df12fbc6efbde10088ca18e1e2cee866ce03d66751d)

## Card List

查看我們的卡牌列表 [CARD.md](./dapp/CARD.md).

## Contributing

查看幫助我們的方法 [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licence

查看 [LICENSE](./LICENSE) .
