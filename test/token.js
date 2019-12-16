const Token = artifacts.require('Token');
const addrs = require('./addresses');

contract('Token', () => {

  let contr = null;
  let contractOwnerAddr = null;
  let reserveHolderAddress = null;
  let pauserAddr = null;
  let decimals = null;
  let initialTotalSupply = null;

  before( async () =>{
    contr = await Token.deployed();
    contractOwnerAddr = addrs.contractOwnerAddress();
    reserveHolderAddress = addrs.reserveHolderAddress();
    pauserAddr = contractOwnerAddr;

    decimals = 18;
    initialTotalSupply = 821*(10**6)*(10**decimals);
    circulatingSupply =  451*(10**6)*(10**decimals);
    reservedSupply =     370*(10**6)*(10**decimals);
  });

  it('should deploy smart contract properly', async function(){
    assert(contr.address != '');
  });

  it('initializes the contract with the correct name', async () =>{
    const result = await contr.name();
    assert.equal(result, 'Becaz Token', 'it assigns token name value');
  });

  it('initializes the contract with the correct pauser', async () =>{
    const result = await contr.isPauser(pauserAddr);
    assert.equal(result, true, 'it assigns pauser address');
  });

  it('initializes the contract with the correct symbol value', async () =>{
    const result = await contr.symbol();
    assert.equal(result, 'BCZ', 'it assigns token symbol');
  });


  it('sets total supply upon deployment', async () =>{
    const result = await contr.totalSupply();
    assert.equal(result, initialTotalSupply ,
                 'sets the total supply 821,000,000 BCZ');
  });

  it("returns circulating total supply", async () =>{
    const result = await contr.balanceOf(contractOwnerAddr);
    assert.equal(result, circulatingSupply,
                 "it allocates the circulating supply to the owner's account");
  });
  // Share holder's address is given when the contract is created.
  // in the migration file.
  it("returns reserved total supply", async () =>{
    const result = await contr.balanceOf(reserveHolderAddress);
    assert.equal(result, reservedSupply,
                 "it allocates the reserved supply to the reserve-holder's account");
  })
})
