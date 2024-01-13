import { ethers } from "hardhat";

async function main() {
  const nftContractAddress = "0xef8255ECFd54Cc37E8c85e8F4038dbf384776e58";
  const collateralContractAddress = "0x3Bc113E070519FeDeB0300e6A9f7A02e2D0241D8";
  const facilitatorContractAddress = "0x8cF9064B292FEbB17312728af0284B2e6F3a4514";
  const tokenId = 20;

  const [signer] = await ethers.getSigners();

  // Create a generic contract instance for the ERC721 NFT contract
  const nftContract = new ethers.Contract(nftContractAddress, [
    "function approve(address to, uint256 tokenId) external"
  ], signer);

  // Approve the NFT transfer
  const approveTx = await nftContract.approve(collateralContractAddress, tokenId);
  await approveTx.wait();
  console.log("NFT transfer approved.");

  // Connect to the Collateral Contract
  const CollateralContract = await ethers.getContractFactory("NFTCollateralContract", signer);
  const collateralContract = CollateralContract.attach(collateralContractAddress);

  // Deposit the NFT
  const depositTx = await collateralContract.depositNFT(tokenId);
  await depositTx.wait();
  console.log("NFT deposited.");

  // Connect to the Facilitator Contract
  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract", signer);
  const facilitatorContract = FacilitatorContract.attach(facilitatorContractAddress);

  // Mint GHO against the NFT
  const mintTx = await facilitatorContract.mintGhoAgainstNFT(tokenId);
  await mintTx.wait();
  console.log("GHO tokens minted against NFT.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
