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

  uint nonce = 0;
  string[] public heros;

  constructor(string name, string symbol) public
    ERC721Token(name, symbol)
  { }

  function initHeros(string heroURI) public onlyOwner {
    heros.push(heroURI);
  }
  /**
   * Only owner can mint
   */
  function mint() public {
    require(heros.length > 0);
    uint256 _tokenId = totalSupply();
    tokenOwner[_tokenId] = msg.sender;
    super._mint(msg.sender, _tokenId);
    super._setTokenURI(_tokenId, heros[rand(0, heros.length)]);
  }

  function burn(uint256 _tokenId) public onlyOwner {
    tokenOwner[_tokenId] = address(0);
    super._burn(ownerOf(_tokenId), _tokenId);
  }

  function getOwnedTokens(address _owner) external view returns (uint256[]) {
    return ownedTokens[_owner];
  }

  function rand(uint min, uint max) private returns (uint){
    nonce++;
    return uint(sha3(nonce))%(min+max)-min;
  }
}