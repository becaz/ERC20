pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";


contract Token is ERC20, ERC20Burnable, ERC20Detailed, ERC20Pausable {
  constructor(address _contractOwner, address _reserveHolder) ERC20Detailed('Becaz Token', 'BCZ', 18)
  public{
    uint256 _circulatingSupply = 451*(10**24);
    uint256 _reservedSupply = 370*(10**24);

    addPauser(_contractOwner);
    _mint(_contractOwner, _circulatingSupply);
    _mint(_reserveHolder, _reservedSupply);
  }

  function burn(uint256 amount) public whenNotPaused {
    super.burn(amount);
  }

  function burnFrom(address account, uint256 amount) public whenNotPaused {
    super.burnFrom(account, amount);
  }
}
