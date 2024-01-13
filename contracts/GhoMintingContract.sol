// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IGhoToken.sol";

contract GhoMintingContract {
  IGhoToken public ghoToken;

  uint256 constant LOAN_TO_VALUE_PERCENT = 50;
  uint256 constant NFT_VALUE = 1 ether;

  constructor(address _ghoToken) {
    ghoToken = IGhoToken(_ghoToken);
  }

  function mintGho() external {
    uint256 loanAmount = (NFT_VALUE * LOAN_TO_VALUE_PERCENT) / 100;
    ghoToken.mint(msg.sender, loanAmount);
  }
}
