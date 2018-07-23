import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const CryptoHerosToken = artifacts.require("CryptoHerosToken");

contract("CryptoHeros token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await CryptoHerosToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should get contract name", async () => {
    let instance = await CryptoHerosToken.deployed();
    let name = await instance.name();
    assert.equal(name, "CryptoHerosToken");
  });

  it("Should get contract symbol", async () => {
    let instance = await CryptoHerosToken.deployed();
    let symbol = await instance.symbol();
    assert.equal(symbol, "HERO");
  });

  it("Should get contract owner", async () => {
    let instance = await CryptoHerosToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("Should mint crypto heros", () => {
    it("Creates crypto heros with specified URI", async () => {
      let instance = await CryptoHerosToken.deployed();

      let token = await instance.mint(accounts[1], '{name: "Portal Network", description: "A gateway to the decentralized world"}');
      let tokenURI = await instance.tokenURI(0);
      assert.deepEqual(tokenURI, '{name: "Portal Network", description: "A gateway to the decentralized world"}');
    });

    it("Set crypto heros token uri", async () => {
      let instance = await CryptoHerosToken.deployed();
      await assertRevert(instance.setTokenURI(0, '{name: "0", description: "Do not work!"}', {from: accounts[2]}));
      await instance.setTokenURI(0, '{name: "0", description: "Do not work!"}', {from: accounts[1]});

      let tokenURI = await instance.tokenURI(0);
      assert.equal(tokenURI, '{name: "0", description: "Do not work!"}');
    });

    it("Get token owner", async () => {
      let instance = await CryptoHerosToken.deployed();
      let owner = await instance.ownerOf(0);
      
      assert.equal(owner, accounts[1]);
    });

    it("Get owned token", async () => {
      let instance = await CryptoHerosToken.deployed();
      let owner = await instance.ownerOf(0);

      let ownedTokens = await instance.getOwnedTokens(owner);
      console.log(ownedTokens);
      //assert.equal(ownedTokens, [0]);
    })

    it("Should transfer ownership", async () => {
      let instance = await CryptoHerosToken.deployed();
      let other = accounts[1];

      let owner = await instance.owner();
      assert.equal(owner, accounts[0]);
      await instance.transferOwnership(other);
      let newOwner = await instance.owner();
      assert.equal(newOwner, accounts[1]);
    });
  });
});
