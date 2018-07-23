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

  constructor(string name, string symbol) public
    ERC721Token(name, symbol)
  { }

  /**
   * Only owner can mint
   */
  function mint(address _to, string _uri) public onlyOwner {
    uint256 _tokenId = totalSupply();
    tokenOwner[_tokenId] = _to;
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _uri);
  }

  function burn(uint256 _tokenId) public onlyOwner {
    tokenOwner[_tokenId] = address(0);
    super._burn(ownerOf(_tokenId), _tokenId);
  }

  function setTokenURI(uint256 _tokenId, string _uri) public onlyOwnerOf(_tokenId) {
    super._setTokenURI(_tokenId, _uri);
  }

  function getOwnedTokens(address _owner) external view returns (uint256[]) {
    return ownedTokens[_owner];
  }
}