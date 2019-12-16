const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {
  let contr = null;
  let contractOwnerAddr = null;
  let pauserAddr = null;
  let genericAddr = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    genericAddr = addrs.genericAddress();
    pauserAddr = contractOwnerAddr;
  });

  describe('pause', async () =>{
    after(async () =>  {
      await contr.unpause({from: pauserAddr});
    });

    it('emits paused event', async () =>{
      const receipt = await contr.pause({from: pauserAddr});
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].args.account, pauserAddr, 'logs the pauser account');
    });

    it('raises exception', async () =>{
      try {
        await contr.burn(10, {from: contractOwnerAddr});
      } catch(e)
      {
        assert(e.message.includes('paused'));
        return;
      }
      assert(false);
    });

    it('raises exception', async () =>{
      try {
        await contr.burnFrom(contractOwnerAddr, 100, {from: contractOwnerAddr});
      } catch(e)
      {
        assert(e.message.includes('paused'));
        return;
      }
      assert(false);
    });

  })
})
