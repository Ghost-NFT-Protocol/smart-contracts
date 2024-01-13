// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollateralContract.sol";
import "./IGhoToken.sol";

contract FacilitatorContract {
  NFTCollateralContract public collateralContract;
  IGhoToken public ghoToken;

  uint256 constant LOAN_TO_VALUE_PERCENT = 50;
  uint256 constant NFT_VALUE = 1 ether;

  constructor(address _collateralContract, address _ghoToken) {
    collateralContract = NFTCollateralContract(_collateralContract);
    ghoToken = IGhoToken(_ghoToken);
  }

  function mintGhoAgainstNFT(uint256 tokenId) external {
    require(collateralContract.depositors(tokenId) == msg.sender, "Not the depositor");
    uint256 loanAmount = (NFT_VALUE * LOAN_TO_VALUE_PERCENT) / 100;
    ghoToken.mint(msg.sender, loanAmount);
  }

  function repayGhoAndRetrieveNFT(uint256 tokenId, uint256 amount) external {
    require(collateralContract.depositors(tokenId) == msg.sender, "Not the depositor");
    ghoToken.burn(amount);
    collateralContract.withdrawNFT(tokenId);
  }
}
