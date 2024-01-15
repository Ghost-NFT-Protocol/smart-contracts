// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IGhoToken.sol";

contract BurnContract {
  IGhoToken public ghoToken;

  constructor(address _ghoToken) {
    ghoToken = IGhoToken(_ghoToken);
  }

  function mintGho(uint256 amount) external {
    ghoToken.mint(msg.sender, amount);
  }

  function fuckingBurnGho(uint256 amount) external {
    require(ghoToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    ghoToken.burn(amount);
  }
}
