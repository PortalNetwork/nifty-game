import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const CryptoHerosToken = artifacts.require("CryptoHerosToken");
const CryptoHerosGame = artifacts.require("CryptoHerosGame");

contract("CryptoHeros token", accounts => {
    let instance;
    let instance2;

    beforeEach(async () => {
      instance = await CryptoHerosToken.deployed();
      instance2 = await CryptoHerosGame.deployed(instance.address);
      //instance = await CryptoHerosToken.new();
      //instance2 = await CryptoHerosGame.new(instance.address);

      // await web3.eth.sendTransaction({
      //   from: accounts[0],
      //   to: instance.address,
      //   gas: 3000000,
      //   value: 10
      // });
    });

  it("Should make first account an owner", async () => {
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should get contract name", async () => {
    let name = await instance.name();
    assert.equal(name, "CryptoHerosToken");
  });

  it("Should get contract symbol", async () => {
    let symbol = await instance.symbol();
    assert.equal(symbol, "HERO");
  });

  it("Should get contract owner", async () => {
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should init hero", async () => {
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
      for (let i=0;i<10;i++) {
        await instance.mint({from: accounts[1]});
      }
    });

    it("Get crypto heros token uri", async () => {
      const res = await instance.getOwnedTokens(accounts[1]);
      for(let i = 0; i < res.length; i++) {
        console.log('res: ', res[i].toString());
        const property = await instance.getTokenProverty(res[i]);
        console.log('property: ', property[1]);
      }
    });

    it.skip("Get token owner", async () => {
      let owner = await instance.ownerOf(0);
      assert.equal(owner, accounts[1]);
    });

    it.skip("Get owned token", async () => {
      let owner = await instance.ownerOf(0);

      let ownedTokens = await instance.getOwnedTokens(owner);
      console.log(ownedTokens.toString());
      //assert.equal(ownedTokens, 0);
    })

    it.skip("Should transfer ownership", async () => {
      let other = accounts[1];

      let owner = await instance.owner();
      assert.equal(owner, accounts[0]);
      await instance.transferOwnership(other);
      let newOwner = await instance.owner();
      assert.equal(newOwner, accounts[1]);
    });


    it.skip("Should transfer ownership", async () => {
      const res = await instance.getOwnedTokens(accounts[1]);
      console.log('instance: ', instance.address);
      //const res2 = await instance2.createSingleGame(res[5]);
      console.log('res: ', res);
      
    });

    
  });
});
