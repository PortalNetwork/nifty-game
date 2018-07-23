pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @title ERC721TokenMock
 * This mock just provides a public mint and burn functions for testing purposes,
 * and a public setter for metadata URI
 */
contract CryptoHerosToken is ERC721Token, Ownable {
  mapping (uint256 => address) internal tokenOwner;

  struct Hero {
    uint number;
    string image;
    string background;
    string description;
  }

  uint nonce = 0;
  Hero[] public heros;
  
  mapping(uint256 => Hero) public tokenProperty;
  

  constructor(string name, string symbol) public
    ERC721Token(name, symbol)
  { }

  function initHeros(uint number, string image, string background, string desc) public onlyOwner {
    heros.push(Hero(number, image, background, desc));
  }
  /**
   * Only owner can mint
   */
  function mint() public {
    require(heros.length > 0);
    uint256 _tokenId = totalSupply();
    tokenOwner[_tokenId] = msg.sender;
    super._mint(msg.sender, _tokenId);
    //super._setTokenURI(_tokenId, heros[rand(0, heros.length)]);
    tokenProperty[_tokenId] = heros[rand(0, heros.length)];
  }

  function burn(uint256 _tokenId) public onlyOwner {
    tokenOwner[_tokenId] = address(0);
    super._burn(ownerOf(_tokenId), _tokenId);
  }

  function getOwnedTokens(address _owner) external view returns (uint256[]) {
    return ownedTokens[_owner];
  }

  function getTokenProverty(uint256 _tokenId) external view returns (uint) {
    // number = tokenProperty[_tokenId].number;
    // image = tokenProperty[_tokenId].image;
    return tokenProperty[_tokenId].number;
  }

  function rand(uint min, uint max) private returns (uint){
    nonce++;
    return uint(sha3(nonce))%(min+max)-min;
  }
}