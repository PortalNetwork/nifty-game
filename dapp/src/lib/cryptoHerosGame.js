var Promise = require('bluebird');
const abi = require('ethereumjs-abi');

const cryptoHerosGameInterface = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			}
		],
		"name": "OwnershipRenounced",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "createSingleGame",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_cryptoHerosToken",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUserSingleGames",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxSingleGameId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "singleGames",
		"outputs": [
			{
				"name": "player",
				"type": "address"
			},
			{
				"name": "userResult",
				"type": "uint256"
			},
			{
				"name": "contractResult",
				"type": "uint256"
			},
			{
				"name": "playerBet",
				"type": "uint256"
			},
			{
				"name": "game",
				"type": "uint8"
			},
			{
				"name": "result",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "usersSingleGames",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

function CryptoHerosGame(web3, address) {
  this.web3 = web3;
  const cryptoHerosGameContract = web3.eth.contract(cryptoHerosGameInterface);
  this.cryptoHerosGamePromise = Promise.resolve(Promise.promisifyAll(cryptoHerosGameContract.at(address)));
}

CryptoHerosGame.prototype.createSingleGame = function (tokenId, callback) {
  let byteData = "0x" +
    abi.methodID("createSingleGame", ["uint"]).toString("hex") +
    abi.rawEncode(["uint"],
      [tokenId]).toString("hex");
  return byteData;
}

CryptoHerosGame.prototype.getUserSingleGames = function (address, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.getUserSingleGamesAsync(address);
  });
}

CryptoHerosGame.prototype.singleGames = function (gameId, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.singleGamesAsync(gameId);
  })
}

module.exports = CryptoHerosGame;