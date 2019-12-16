## ERC20
- Token type: ERC20 utility
- Total supply: 821,000,000.
- Circulating Supply: 451,000,000
- Symbol: BCZ
- Decimals: 18


The **Total Supply** (TS) denotes the number of tokens issued minus the total number of coins that were burned.

The **Circulating Supply** (CS) denotes the total number of tokens ready for trading or already in the hands of the public.

The difference between the Total Supply and the Circulating Supply (TS - CS) is referred as the **Locked/Reserved Supply** and is used by the team for research and development.

When the smart contract is created its constructor is supplied with two EOA: contract owner address and address of a reserved tokens holder. Circulating tokens (821,000,000) are transferred to the contract owner's address and the rest (370,000,000) goes to the address of the reserved tokens holder.   

This contract may be paused. Only contract owner can pause and resume the the contract. Tokens may be burned unless the the contract is paused. 
