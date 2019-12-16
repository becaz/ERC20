const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {
  let contr = null;
  let contractOwnerAddr = null;
  let spenderAddr = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    spenderAddr = '0xa9af25bdc7cC65124769A5Ec1dD76538dc53c5c0';
  });

  describe('approve', async () => {
    it('emits approve event', async () =>{
      const receipt = await contr.approve(spenderAddr, 100, { from : contractOwnerAddr });
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].args.owner, contractOwnerAddr, 'logs the account the token are authorized by');
      assert.equal(receipt.logs[0].args.spender, spenderAddr, 'logs the account the token are authorized to');
      assert.equal(receipt.logs[0].args.value, 100, 'logs the transfer ammount');
    });
  })
})
