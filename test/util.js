const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  );

const getBalance = async addr => {
  const res = await promisify(cb => web3.eth.getBalance(addr, cb));
  return new web3.BigNumber(res);
};

module.exports = {
  getBalance
};
