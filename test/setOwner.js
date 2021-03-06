const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {
  let contr = null;
  let otherAddr = null;
  let contractOwnerAddr = null;
  let accounts = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    newOwnerAddr = addrs.newOwnerAddress();
    otherAddr = addrs.genericAddress();
    zeroAddr = '0x0000000000000000000000000000000000000000';
  });


  describe('setOwner', async () => {

    describe('when a new owner address is the zero address', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setOwner(zeroAddr, {from: contractOwnerAddr});
        } catch(e)
        {
          return;
        }
        assert(false);
      });
    });

    describe('when sender is not an owner', async () => {
      it('raises exception', async () =>{
        try {
          await contr.setOwner(newOwnerAddr, {from: otherAddr});
        } catch(e)
        {
          assert(e.message.includes('NOT_OWNER'));
          return;
        }
        assert(false);
      });
    });


    describe('when sender is the owner', async () => {
      it('sets a new owner', async () =>{
        await contr.setOwner(newOwnerAddr, {from: contractOwnerAddr});

        const owner = await contr.owner();
        const isNewOwnerPauser = await contr.isPauser(newOwnerAddr);
        const isOldOwnerPauser = await contr.isPauser(contractOwnerAddr);

        assert.equal(owner, newOwnerAddr, 'it sets a new owner');
        assert.equal(isNewOwnerPauser, true, 'it sets a new pauser');
        assert.equal(isOldOwnerPauser, false, 'it renounces the old pauser');

      });
    });

  });

});
