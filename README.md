# Nifty Game 

This repo is a crypto card game base on ERC721, non-fungible token, using [OpenZepplin](https://github.com/OpenZeppelin/openzeppelin-solidity).

## How To Install Dependencies

First install required dependencies:  
  
You'll need local ethereum node, I recommend `ganache-cli`. You can install it from npm.

```
npm install -g ganache-cli
```

Then install contract dependencies:  

```
npm install
```

## How To Test

First make sure that local ethereum node is running. Execute:

```
ganache-cli --gasLimit 0xffffffffff -p 8545
```

Now you can compile and deploy contracts:

```
truffle compile && truffle migrate
```

Run contract tests:

```
truffle test
```
