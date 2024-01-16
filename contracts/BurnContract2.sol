// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IGhoToken.sol";

contract BurnContract2 {
  IGhoToken public ghoToken;

  constructor(address _ghoToken) {
    ghoToken = IGhoToken(_ghoToken);
  }

  function mintGho(uint256 amount) external {
    ghoToken.mint(msg.sender, amount);
  }

  function burnGho(uint256 amount) external {
    ghoToken.burn(amount);
  }
}
