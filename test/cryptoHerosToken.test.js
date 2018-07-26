import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const CryptoHerosToken = artifacts.require("CryptoHerosToken");
const CryptoHerosGame = artifacts.require("CryptoHerosGame");

contract("CryptoHeros token", accounts => {
  let cryptoHerosToken;
  let cryptoHerosGame;

  beforeEach(async () => {
    cryptoHerosToken = await CryptoHerosToken.deployed();
    console.log(cryptoHerosToken.address);
    cryptoHerosGame = await CryptoHerosGame.new(cryptoHerosToken.address);
    console.log(cryptoHerosGame.address);
  });

  it("Should make first account an owner on CryptoHerosToken", async () => {
    let owner = await cryptoHerosToken.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should make first account an owner on CryptoHerosGame", async () => {
    let owner = await cryptoHerosGame.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should get contract name", async () => {
    let cryptoHerosToken = await CryptoHerosToken.deployed();
    let name = await cryptoHerosToken.name();
    assert.equal(name, "CryptoHerosToken");
  });

  it("Should get contract symbol", async () => {
    let cryptoHerosToken = await CryptoHerosToken.deployed();
    let symbol = await cryptoHerosToken.symbol();
    assert.equal(symbol, "HERO");
  });

  it("Should get contract owner", async () => {
    let cryptoHerosToken = await CryptoHerosToken.deployed();
    let owner = await cryptoHerosToken.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should init hero", async () => {
    let cryptoHerosToken = await CryptoHerosToken.deployed();
    let result = await cryptoHerosToken.initImage('image0');
    assert.equal(result.receipt.status, '0x1');
    let result2 = await cryptoHerosToken.initBackground('background0');
    assert.equal(result2.receipt.status, '0x1');
    let result3 = await cryptoHerosToken.initNumberAndDescription(1, 'description0');
    assert.equal(result3.receipt.status, '0x1');
    let result4 = await cryptoHerosToken.initNumberAndDescription(2, 'description0');
    assert.equal(result4.receipt.status, '0x1');
    let result5 = await cryptoHerosToken.initNumberAndDescription(3, 'description0');
    assert.equal(result5.receipt.status, '0x1');
    //assert.equal(owner, accounts[0]);
  });

  describe("Crypto Heros", () => {
    it("Creates crypto heros with specified URI", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      for (let i=0;i<10;i++) {
        await cryptoHerosToken.mint({from: accounts[1], value: web3.toWei(0.02, "ether")});
      }
    });

    it("Get crypto heros token uri", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      const res = await cryptoHerosToken.getOwnedTokens(accounts[1]);
      for(let i = 0; i < res.length; i++) {
        const property = await cryptoHerosToken.getTokenProperty(res[i]);
        console.log(property);
        //assert.equal(property.toNumber() >= 0, true);
      }
    });

    it.skip("Get token owner", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      let owner = await cryptoHerosToken.ownerOf(0);
      assert.equal(owner, accounts[1]);
    });

    it.skip("Get owned token", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      let owner = await cryptoHerosToken.ownerOf(0);

      let ownedTokens = await cryptoHerosToken.getOwnedTokens(owner);
      console.log(ownedTokens.toString());
      //assert.equal(ownedTokens, 0);
    })

    it.skip("Should transfer ownership", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      let other = accounts[1];

      let owner = await cryptoHerosToken.owner();
      assert.equal(owner, accounts[0]);
      await cryptoHerosToken.transferOwnership(other);
      let newOwner = await cryptoHerosToken.owner();
      assert.equal(newOwner, accounts[1]);
    });


    it("Start a game", async () => {
      let cryptoHerosToken = await CryptoHerosToken.deployed();
      const res = await cryptoHerosToken.getOwnedTokens(accounts[1]);
      //console.log('res: ', res);
      console.log('cryptoHerosGame: ', cryptoHerosGame.address);
      web3.eth.sendTransaction({from: accounts[0], to: cryptoHerosGame.address, value: web3.toWei(10,"ether"), gas: 2000000});
      console.log(web3.eth.getBalance(accounts[0]).toNumber());

      for (let i=0;i<res.length;i++) {
        const res2 = await cryptoHerosGame.createSingleGame(res[i], {from: accounts[1], value: web3.toWei(0.02, "ether")});
        assert.equal(res2.receipt.status, '0x1');
        // let singleGames = await cryptoHerosGame.singleGames(i);
        // console.log('game result: ', singleGames[5].toString() + ' | ' + singleGames[4].toString() + ' | ' + singleGames[1].toString() + ' | ' + singleGames[2].toString());
      }

      const res3 = await cryptoHerosGame.getUserSingleGames(accounts[1]);
      for (let i=0;i<res3.length;i++) {
        console.log(res3[i].toString());
        let singleGames = await cryptoHerosGame.singleGames(res3[i].toString());
        console.log('game result: ', singleGames[5].toString() + ' | ' + singleGames[4].toString() + ' | ' + singleGames[1].toString() + ' | ' + singleGames[2].toString());
      }
      
    });
  });
});
