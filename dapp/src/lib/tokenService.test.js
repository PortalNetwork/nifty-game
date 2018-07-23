import { 
  getName,
  getSymbol,
  getDecimals
} from './tokenService';

test('getName', async () => {
  try {
    const name = await getName('3');
    console.log('name', name);
  } catch(err) {
    console.log(err);
  }
});

test('getSymbol', async () => {
  try {
    const symbol = await getSymbol('3');
    console.log('symbol', symbol);
  } catch(err) {
    console.log(err);
  }
});

test('getDecimals', async () => {
  try {
    const decimals = await getDecimals('3');
    console.log('decimals', decimals);
  } catch(err) {
    console.log(err);
  }
});