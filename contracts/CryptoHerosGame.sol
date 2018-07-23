pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './CryptoHerosToken.sol';

contract CryptoHerosGame is Ownable {
  
  uint constant gameFee = 0.005 ether;
  uint constant minPrice = 0.01 ether;
  uint constant minHerosToken = 5 ether;

  //address public cryptoHerosGame = 0x0;
  uint256 public maxGameId = 0;
  uint256 public maxSingleGameId = 0;

  uint nonce = 0;
  CryptoHerosToken cryptoHerosToken;

  struct Game {
    address winner;
    address creator;
    address participant;
    uint256 creatorTokenId;
    uint256 participantTokenId;
    uint256 creatorBet;
    uint256 participantBet;
  }

  struct SingleGame {
    address player;
    uint256 playerTokenId;
    uint256 contractResult;
    uint256 playerBet;
    uint8 winner; // 0 user, 1 contract, 2 draw
  }

  Game[] public games;
  SingleGame[] public singleGames;

  function CryptoHerosGame(CryptoHerosToken _cryptoHerosToken) public {
        cryptoHerosToken = _cryptoHerosToken;
    }


  function createSingleGame(uint _tokenId) payable public returns (uint256) {
    require(msg.value >= minPrice);
    // 判斷合約有沒有錢跟他玩
    require(cryptoHerosToken.ownerOf(_tokenId) == msg.sender);

    // 取得 number 進行比大小
    uint userTokenNumber = cryptoHerosToken.getTokenProverty(_tokenId);
    uint contractNumber = rand(0, 10);

    int result;
    if (rand(0, 1) > 0) {
      result = int(userTokenNumber - contractNumber);
    } else {
      result = int(contractNumber - userTokenNumber);
    }

    SingleGame memory _singleGame;
    if (result == 0) {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: _tokenId, contractResult: contractNumber, playerBet: msg.value, winner: 2});
      msg.sender.send(msg.value * 1 - gameFee);
    } else if (result > 0) {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: _tokenId, contractResult: contractNumber, playerBet: msg.value, winner: 0});
      //var Ether = msg.value;
      msg.sender.send(msg.value * 150 / 100);
    } else {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: _tokenId, contractResult: contractNumber, playerBet: msg.value, winner: 1});
    }

    maxSingleGameId = singleGames.push(_singleGame) - 1;
    return maxSingleGameId;
  }

  /*
  function createGame(uint _tokenId) payable public returns (uint256) {
    // 創建遊戲，回傳 id
    require(msg.value > 0);
    // Create new game id
    Game memory _game = Game({ winner: 0x0, creator: msg.sender, creatorTokenId: _tokenId, creatorBet: msg.value, participant: 0x0, participantTokenId: 0, participantBet: 0 });
    maxGameId = games.push(_game) - 1;
    return maxGameId;
  }

  function paricipantGame(uint _gameId, uint _tokenId) payable public returns (bool) {
    // 要驗證主合約
    require(msg.value > 0);
    // game exists
    require(_gameId < maxGameId);
    Game memory _game = games[_gameId];
    require(_game.winner == 0x0);
    games[_gameId] = Game({ winner: 0x0, creator: _game.creator, creatorTokenId: _game.creatorTokenId, creatorBet: _game.creatorBet, participant: msg.sender, participantTokenId: _tokenId, participantBet: msg.value });
  }

  function revealGame(uint _gameId) payable public returns (address) {
    // 判斷贏家
    Game memory _game = games[_gameId];
    require(_game.creator != 0x0);
    require(_game.participant != 0x0);
  }
  */

  function rand(uint min, uint max) private returns (uint){
    nonce++;
    return uint(sha3(nonce))%(min+max)-min;
  }

}
