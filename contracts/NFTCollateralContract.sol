// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTCollateralContract {
  IERC721 public nftToken;

  mapping(uint256 => address) public depositors;

  constructor(address _nftTokenAddress) {
    nftToken = IERC721(_nftTokenAddress);
  }

  function depositNFT(uint256 tokenId) external {
    nftToken.transferFrom(msg.sender, address(this), tokenId);
    depositors[tokenId] = msg.sender;
  }

  function withdrawNFT(uint256 tokenId) external {
    require(depositors[tokenId] == msg.sender, "Not the depositor");
    depositors[tokenId] = address(0);
    nftToken.transferFrom(address(this), msg.sender, tokenId);
  }
}
