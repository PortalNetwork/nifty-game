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

  it("Should init hero", async () => {
    let instance = await CryptoHerosToken.deployed();
    let result = await instance.initHeros(0, 'image0', 'background0', 'dec0');
    assert.equal(result.receipt.status, '0x1');
    let result2 = await instance.initHeros(1, 'image1', 'background1', 'dec1');
    assert.equal(result2.receipt.status, '0x1');
    let result3 = await instance.initHeros(2, 'image2', 'background2', 'dec2');
    assert.equal(result3.receipt.status, '0x1');
    //assert.equal(owner, accounts[0]);
  });

  describe("Should mint crypto heros", () => {
    it("Creates crypto heros with specified URI", async () => {
      let instance = await CryptoHerosToken.deployed();
      for (let i=0;i<10;i++) {
        await instance.mint({from: accounts[1]});
      }
      //let hero = await instance.heros();
      //console.log(hero);
      //let heros = await instance.heros(0);
      //assert.deepEqual(heros, '{name: "Portal Network", description: "A gateway to the decentralized world"}');
    });

    it("Get crypto heros token uri", async () => {
      let instance = await CryptoHerosToken.deployed();

      const res = await instance.getOwnedTokens(accounts[1]);
      for(let i = 0; i < res.length; i++) {
        console.log('res: ', res[i].toString());
        const property = await instance.getTokenProverty(res[i]);
        console.log('property: ', property[1]);
      }
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
      console.log(ownedTokens.toString());
      //assert.equal(ownedTokens, 0);
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
