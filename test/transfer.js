const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {
  let contr = null;
  let contractOwnerAddr = null;
  let zeroAddr = null;
  let genericAddr = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    genericAddr = addrs.genericAddress();
    zeroAddr = '0x0000000000000000000000000000000000000000';
  });

  describe('transfer', async () =>{
    let contractOwnerBal = null;

    before(async () =>  {
      contractOwnerBal = await contr.balanceOf(contractOwnerAddr);
    });

    it ('transfers tokens from the owner', async ()=>{
      const receipt = await contr.transfer(genericAddr, 100, {from: contractOwnerAddr});

      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].args.from, contractOwnerAddr, 'logs the owner account');
      assert.equal(receipt.logs[0].args.to,  genericAddr, 'logs the receiver address');
      assert.equal(receipt.logs[0].args.value, 100, 'logs the transfer amount');

      let bal = await contr.balanceOf(genericAddr);
      assert.equal(bal, 100, 'it adds tokens');

      bal = await contr.balanceOf(contractOwnerAddr);
      assert.equal(bal, contractOwnerBal - 100, 'it deducts tokens');
    })
  })
})
