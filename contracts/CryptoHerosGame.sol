pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract CryptoHerosGame is Ownable {
  
  address public cryptoHerosGame = 0x0;
  uint256 public maxGameId = 0;
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

  Game[] public games;

  function createSingleGame(uint _tokenId) payable public returns (uint256) {
    require(msg.value > 0);
    // 判斷合約有沒有錢跟他玩
    require(cryptoHerosToken.ownerOf(_tokenId) == msg.sender);
    // 取得 number 進行比大小
    uint creatorNumber = cryptoHerosToken.tokenURI(_tokenId).number;
    uint _participantTokenId = rand(0, 19);
    uint participantNumber = cryptoHerosToken.tokenURI(_participantTokenId).number;
    // TODO RANDOM BIG OR SMALL
    // TODO creator 與 participant 比大小
    // TODO 更新 winner
    Game memory _game = Game({ winner: 0x0, creator: msg.sender, creatorTokenId: _tokenId, creatorBet: msg.value, participant: 0x0, participantTokenId: _participantTokenId, participantBet: msg.value });
    maxGameId = games.push(_game) - 1;
    // 贏錢的話會打錢給 creator 送錢: msg.sender.send(msg.value * 2 - fee); 包 require
    return maxGameId;
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
