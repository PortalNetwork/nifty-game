# Nifty Game 

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
- ganeche

## How To Install Dependencies

先安裝所需的相關套件：  
  
會需要在local端起一個以太坊的節點，推薦使用 `ganache-cli`，你可以透過 npm install來安裝。

```
npm install -g ganache-cli
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