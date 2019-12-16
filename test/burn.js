const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {
  let contr = null;
  let contractOwnerAddr = null;
  let zeroAddr = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    zeroAddr = '0x0000000000000000000000000000000000000000';
  });

  describe('burn', async () => {
    let contractOwnerBal = null;

    before(async () =>  {
      contractOwnerBal = await contr.balanceOf(contractOwnerAddr);
    });

    it('emits transfer event', async () =>{
      const receipt = await contr.burn(100, {from: contractOwnerAddr});

      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].args.from, contractOwnerAddr, 'logs the owner account');
      assert.equal(receipt.logs[0].args.to,  zeroAddr, 'logs zero address');
      assert.equal(receipt.logs[0].args.value, 100, 'logs the burn amount');
    });

    it('reduces the total supply', async () =>{
      const rem = await contr.balanceOf(contractOwnerAddr);
      assert.equal(rem, contractOwnerBal - 100,
                   "it burns the owner's tokens");
    })
  })
})
