pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";


contract Token is ERC20, ERC20Burnable, ERC20Detailed, ERC20Pausable {

  address private _owner;

  constructor(address _contractOwner, address _reserveHolder) ERC20Detailed('Becaz Token', 'BCZ', 18)
  public{
    uint256 _circulatingSupply = 451*(10**24);
    uint256 _reservedSupply = 370*(10**24);

    _owner = _contractOwner;
    addPauser(_owner);

    _mint(_owner, _circulatingSupply);
    _mint(_reserveHolder, _reservedSupply);
  }


  function setOwner(address ownerAddr) public
  {
    require(_owner == msg.sender, "NOT_OWNER");
    require(ownerAddr != address(0), "ZERO_ADDR");

    addPauser(ownerAddr);
    _removePauser(_owner);

    _owner = ownerAddr;
  }


  function owner() public view returns(address)
  {
    return _owner;
  }

  function burn(uint256 amount) public whenNotPaused {
    super.burn(amount);
  }

  function burnFrom(address account, uint256 amount) public whenNotPaused {
    super.burnFrom(account, amount);
  }
}
