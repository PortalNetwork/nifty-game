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
    uint8 game; // 0: smaller. 1: greater
    uint8 result; // 0 user win, 1 contract win, 2 draw
  }

  Game[] public games;
  SingleGame[] public singleGames;

  constructor(CryptoHerosToken _cryptoHerosToken) public { 
    cryptoHerosToken = _cryptoHerosToken;
  }

  function createSingleGame(uint _tokenId) payable public returns (uint256) {
    require(msg.value >= minPrice);
    require(cryptoHerosToken.ownerOf(_tokenId) == msg.sender);

    uint userTokenNumber;
    uint contractTokenNumber;
    (userTokenNumber, , ,) = cryptoHerosToken.getTokenProverty(_tokenId);
    (contractTokenNumber, , ,) = cryptoHerosToken.getTokenProverty(rand(0, cryptoHerosToken.getHerosLength()));

    int result;
    uint8 game = uint8(rand(0, 2));
    if (game > 0) {
      result = int(userTokenNumber - contractTokenNumber);
    } else {
      result = int(contractTokenNumber - userTokenNumber);
    }

    SingleGame memory _singleGame;
    if (result == 0) {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: userTokenNumber, contractResult: contractTokenNumber, playerBet: msg.value, game: game, result: 2});
      require(msg.sender.send(msg.value * 1 - gameFee));

    } else if (result > 0) {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: userTokenNumber, contractResult: contractTokenNumber, playerBet: msg.value, game: game, result: 0});
      require(msg.sender.send(msg.value * 150 / 100));

    } else {
      _singleGame = SingleGame({player: msg.sender, playerTokenId: userTokenNumber, contractResult: contractTokenNumber, playerBet: msg.value, game: game, result: 1});
    }

    maxSingleGameId = singleGames.push(_singleGame) - 1;
    return maxSingleGameId;
  }

  function rand(uint min, uint max) private returns (uint){
    nonce++;
    return uint(sha3(nonce))%(min+max)-min;
  }

  function withdraw(uint amount) public payable onlyOwner returns(bool) {
    require(amount <= this.balance);
    owner.transfer(amount);
    return true;
  }

}
