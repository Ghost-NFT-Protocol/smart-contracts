import { ethers } from "hardhat";

async function main() {
  const facilitatorContractAddress = "0xAdbe6d7AbD11cef2682Eb18Ff6A95fa7014463f3";
  const ghoTokenAddress = "0x5855B90fccf839c74F7807E9eb2782f517E006E1";
  const nftContractAddress = "0x4b07E711e5C9b5bF05e69f8B7fc46F67C81A730A";
  const tokenId = 0;

  const [signer] = await ethers.getSigners();

  const nftContract = new ethers.Contract(nftContractAddress, [
    "function approve(address to, uint256 tokenId) external"
  ], signer);

  const approveTx = await nftContract.approve(facilitatorContractAddress, tokenId);
  await approveTx.wait();
  console.log("NFT transfer approved");

  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract", signer);
  const facilitatorContract = FacilitatorContract.attach(facilitatorContractAddress);

  const priceFeedAddress = await facilitatorContract.collections(nftContractAddress);
  console.log(`Price Feed Address for ${nftContractAddress}: ${priceFeedAddress}`);

  const depositTx = await facilitatorContract.depositNFT(nftContractAddress, tokenId);
  await depositTx.wait();
  console.log(`Successfully deposited, Transaction Hash: ${depositTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
