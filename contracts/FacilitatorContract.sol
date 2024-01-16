// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IGhoToken.sol";

contract FacilitatorContract {
  IGhoToken public ghoToken;

  uint256 constant LOAN_TO_VALUE_PERCENT = 50;
  uint256 constant NFT_VALUE = 1 ether;

  struct NFT {
    address nftContract;
    uint256 tokenId;
  }

  mapping(address => NFT[]) public nftDeposits; // Mapping of depositor addresses to lists of NFTDeposit structs

  constructor(address _ghoToken) {
    ghoToken = IGhoToken(_ghoToken);
  }

  function depositNFTAndMintGho(address nftContract, uint256 tokenId) external {
    nftDeposits[msg.sender].push(NFT(nftContract, tokenId));
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    uint256 loanAmount = (NFT_VALUE * LOAN_TO_VALUE_PERCENT) / 100;
    ghoToken.mint(msg.sender, loanAmount);
  }

  function repayGhoAndWithdrawNFT(uint256 tokenId, uint256 amount) external {
    NFT[] storage deposits = nftDeposits[msg.sender];
    for (uint256 i = 0; i < deposits.length; i++) {
      if (deposits[i].tokenId == tokenId) {
        ghoToken.burn(amount);
        IERC721(deposits[i].nftContract).transferFrom(address(this), msg.sender, tokenId);
        delete deposits[i];
        break;
      }
    }
  }
}
